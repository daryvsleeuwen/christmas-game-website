import axios from '../../../axios/index'

export async function load({ params }: any) {
    const user = await axios.post('auth/signin', { uuid: params.uuid })

    if(user.data.accessToken !== null){
      return { error: false, ...user.data }
    }

    return { error: true }
}