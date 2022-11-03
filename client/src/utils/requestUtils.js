import Cookies from 'js-cookie';

const getHeaders = () =>  {
    const headers = {}
    const token = Cookies.get('token')
    if (token) headers["Authorization"] = `Bearer ${token}`
    return headers
}

export { getHeaders }
