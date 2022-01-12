import axios from 'axios'

export const getBlogById = async(id: any) => {
    const response = await axios.get<any>(`/blog/${id}`)
    return response.data
}
