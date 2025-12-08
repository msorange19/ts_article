import fs from 'fs';
import express from 'express';
import client from 'prom-client';

const app = express();
const register = new client.Registry();

// -------------------------
// PROMETHEUS METRICS
// -------------------------
const testCounter = new client.Counter({
    name: 'playwright_test_total',
    help: 'Total number of Playwright tests',
    labelNames: ['status']
});
register.registerMetric(testCounter);

const durationGauge = new client.Gauge({
    name: 'playwright_test_duration_seconds',
    help: 'Total test duration in seconds'
});
register.registerMetric(durationGauge);

// -------------------------
// READ PLAYWRIGHT JSON
// -------------------------
const file = 'results/test-results.json';

if (!fs.existsSync(file)) {
    console.error(`❌ File not found: ${file}`);
    process.exit(1);
}

let data;

try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'));
} catch (err) {
    console.error("❌ Failed to parse JSON file!");
    console.error(err.message);
    process.exit(1);
}

// -------------------------
// FIXED: RECURSIVE PARSER
// -------------------------
function extractTests(suite, callback) {
    // Extract from specs → tests → results
    if (suite.specs) {
        suite.specs.forEach(spec => {
            spec.tests.forEach(test => {
                test.results.forEach(result => callback(result));
            });
        });
    }

    // Go deeper into nested suites
    if (suite.suites) {
        suite.suites.forEach(childSuite => extractTests(childSuite, callback));
    }
}

// -------------------------
// COUNT TEST RESULTS
// -------------------------
let passed = 0;
let failed = 0;
let duration = 0;

(data.suites || []).forEach(suite => {
    extractTests(suite, (result) => {
        if (result.status === "passed") passed++;
        else if (result.status === "failed") failed++;

        duration += result.duration || 0;
    });
});

// -------------------------
// UPDATE PROMETHEUS METRICS
// -------------------------
testCounter.inc({ status: 'passed' }, passed);
testCounter.inc({ status: 'failed' }, failed);
durationGauge.set(duration / 1000); // convert ms → seconds

// -------------------------
// METRICS ENDPOINT
// -------------------------
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// -------------------------
app.listen(9100, () =>
    console.log('✅ Metrics available at http://localhost:9100/metrics')
);
