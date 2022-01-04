import {API_URL} from "../Constants/Config"

export function callGetApi(endpoint) {
    return fetch(`${API_URL}/${endpoint}`, {
        method: 'GET',
        headers:{
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then(res => res.json())
    .catch(err => {
        console.log(err)
    });
}
export function callPostApi(endpoint, check) {
    return fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify(check.body)
    })
    .then(res => {
        if(!res.ok){
            check.res = true;
        }
        return res.json();
    })
    .catch(err => {
        console.log(err)
    });
}
export function callDeleteApi(endpoint, check) {
    return fetch(`${API_URL}/${endpoint}`, {
        method: 'DELETE',
        headers:{
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then(res => {
        if(!res.ok){
            check.res = true;
        }
        return res.json();
    })
    .catch(err => {
        console.log(err)
    });
}

export function callPutApi(endpoint, action) {
    return fetch(`${API_URL}/${endpoint}`, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify(action.body)
    })
    .then(res => {
        if(!res.ok){
            action.res = true;
        }
        if(res.status === 204){
            return {}
        }
        return res.json();
    })
    .catch(err => {
        console.log(err)
    });
}
export function callPutApiNotJson(endpoint, action) {
    return fetch(`${API_URL}/${endpoint}`, {
        method: 'PUT',
        headers:{
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: action.body
    })
    .then(res => {
        console.log(res)
        if(!res.ok){
            action.res = true;
        }
        if(res.status === 204){
            return {}
        }
        return res.json();
    })
    .catch(err => {
        console.log(err)
    });
}

export function callPutNotBody(endpoint, action) {
    return fetch(`${API_URL}/${endpoint}`, {
        method: 'PUT',
        headers:{
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
    })
    .then(res => {
        console.log(res)
        if(!res.ok){
            action.res = true;
        }
        if(res.status === 204){
            return {}
        }
        return res.json();
    })
    .catch(err => {
        console.log(err)
    });
}