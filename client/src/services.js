import axios from 'axios';

const requestGet = (url, body) => {
  return axios.get(url,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1l'
      },
      params: body
    })
    .then((response) => { return response.data })
    .catch((error) => { return { status: false, data: 'Error in load page, please refresh', error: error } });
};


const requestPost = (url, body) => {
  return axios.post(url,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1l'
      }
    })
    .then((response) => { return response.data })
    .catch((error) => { return { status: false, data: 'Error in load page, please refresh', error: error } });
}

const requestPut = (url, body) => {
  return axios.put(url,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1l'
      }
    })
    .then((response) => { return response.data })
    .catch((error) => { return { status: false, data: 'Error in load page, please refresh', error: error } });
}

const requestDelete = (url, body) => {
  return axios.delete(url,
    {
      data: body
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1l'
      }
    }
  )
    .then((response) => { return response.data })
    .catch((error) => { return { status: false, data: 'Error in load page, please refresh', error: error } });
}

export { requestGet, requestPost, requestPut, requestDelete };
