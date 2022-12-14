import axios from '../axios/index'


export const isAuth = async () =>{
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken === undefined || accessToken === null) return null
    
    const response = await axios.post('auth/is-auth', { accessToken: accessToken })

    if (response.data){
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
    }
    
    return response.data
}