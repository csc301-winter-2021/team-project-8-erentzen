// import config from 'config'
const localUrl = "http://localhost:3000"
const ngrokUrl = "http://be011cedb477.ngrok.io/"
const productionUrl = "https://csc301-erentzen.herokuapp.com"

const useUrl = ngrokUrl;

export const itemService = {
    fetchAll,
    updateInventory,
    getRecentOrder
};

function fetchAll() {
    const requestOptions = {
        method : 'GET',
    };
    return fetch(`${useUrl}/items/`, requestOptions).then(handleResponse)
 }

function getRecentOrder(){
    const requestOptions = {
        method : 'GET',
    };
    return fetch(`${useUrl}/orders/`, requestOptions).then(handleResponse)
}

function updateInventory(id, count) {
    const url = `${useUrl}/update/${id}`

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
