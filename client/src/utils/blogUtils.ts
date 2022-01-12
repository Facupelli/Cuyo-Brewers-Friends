import axios from 'axios'

export const getBlogById = async(id: any) => {
    const response = await axios.get<any>(`/blog/${id}`)
    return response.data
}

export const getUserByUsername = async(username: any) => {
    const response = await axios.get<any>(`/user?username=${username}`)
    return response.data
}