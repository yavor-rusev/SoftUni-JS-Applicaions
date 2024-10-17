export async function request(method, url, data, token) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    }

    if(data) {
        options.body = JSON.stringify(data);
    }

    if(token) {
        options.headers['X-Authorization'] = token;
    }

    try{        
        const res = await fetch(url, options);

        if(res.status !== 200) {            
            if(url === 'http://localhost:3030/users/logout' && res.status === 204) {
                return res;
            }

            const err = await res.json();
            throw err;
        }

        const resData = await res.json();
        return resData;

    }catch(error) {
        return error;
    }
}