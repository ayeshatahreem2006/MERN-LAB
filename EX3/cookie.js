async function fetchWithCookies(url) {

    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    });

    const cookies =
        response.headers.get('set-cookie');

    console.log(cookies);
}

const url = 'https://httpbin.org/cookies';

fetchWithCookies(url);