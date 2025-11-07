import testData from '../config/data.json';
let token =""
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

    const datatags = await response.json();
    console.log(datatags);
}