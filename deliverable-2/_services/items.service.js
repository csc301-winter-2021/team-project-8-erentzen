// import config from 'config'
const localUrl = "http://localhost:3000"
const ngrokUrl = "https://dcefb6e277e1.ngrok.io"
const productionUrl = "https://csc301-erentzen.herokuapp.com"

const useUrl = productionUrl;

export const itemService = {
    fetchAll,
    updateInventory,
    getRecentOrder
};

function fetchAll() {
    const requestOptions = {
        method : 'GET',
    };
    return fetch(`https://csc301-erentzen.herokuapp.com/items/`, requestOptions).then(handleResponse)
 }

function getRecentOrder(){
    const requestOptions = {
        method : 'GET',
    };
    return fetch(`https://csc301-erentzen.herokuapp.com/orders/`, requestOptions).then(handleResponse)
}

function updateInventory(id, count) {
    const url = `https://csc301-erentzen.herokuapp.com/update/${id}`

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
