// import config from 'config'

export const itemService = {
    fetchAll,
    updateInventory
};

function fetchAll() {
    const requestOptions = {
        method : 'GET',
    };
    return fetch(`http://localhost:3000/items/`, requestOptions).then(handleResponse)
 }

function updateInventory(id, count) {
    const url = `http://localhost:3000/update/${id}`

    const request = new Request(url, {
        method: 'PATCH', 
        body: JSON.stringify({
            count: count
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return fetch(request)

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
