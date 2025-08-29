import testData from '../config/data.json';

export async function getUserFromApi(request) {
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
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
    return data.user;
}
