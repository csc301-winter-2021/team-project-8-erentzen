// import config from 'config'

export const itemService = {
    fetchAll
};

function fetchAll() {
    const requestOptions = {
        method : 'GET',
    };
    // `${process.env.SHOPIFY_APP_URL}/items/`
    return fetch(`http://localhost:3000/items/`, requestOptions).then(handleResponse)
 }

 function handleResponse(response) {
    return response.text().then(text => {
        console.log(text)
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}