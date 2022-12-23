import axios from '../axios/index'


export const isAuth = async () =>{
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken === undefined || accessToken === null || accessToken === '') return null
    
    const response = await axios.post('auth/is-auth', { accessToken: accessToken })

    if (response.data === '') return null
    
    if (response.data.accessToken){
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
    }
    
    return response.data
}