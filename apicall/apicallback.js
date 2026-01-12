import testData from '../config/data.json';

let token = ""

export async function getUserFromApi(request) {
    const response = await request.post(`${testData.base_url}/users/login`, {
        data: {
            user: {
                email: testData.username,
                password: testData.password,
            }
        }
    });

    if (!response.ok()) {
        throw new Error(`Login failed: ${response.status()}`);
    }

    const data = await response.json();
    token = data.user.token;
    return data.user;
}


export async function tagFinder(request) {

    const response = await request.get(`${testData.base_url}/tags`, {

        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    if (!response.ok()) {
        throw new Error(`Tag finder failed: ${response.status()}`);

    }
    const tagValue = await response.json();
    //console.log('BE tags from API', tagValue.tags);
    return tagValue.tags;
}


export async function favCount(request) {
    console.log('debugger token issue', token);

    const response = await request.get(`${testData.base_url}/articles`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    if (!response.ok()) {
        throw new Error(`favourite count failed: ${response.status()}`);

    }
    const articlesData = await response.json();
    return articlesData.articles;
}