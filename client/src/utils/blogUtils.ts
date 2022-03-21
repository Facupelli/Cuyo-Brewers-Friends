import axios from 'axios'
import { Blog, UserData } from '../redux/reducers/types'

export const getBlogById = async(id: unknown) => {
    const response = await axios.get<Blog>(`/blog/${id}`)
    return response.data
}

export const getUserByUsername = async(username: unknown) => {
    const response = await axios.get<UserData>(`/user?username=${username}`)
    console.log(response.data)
    return response.data
}