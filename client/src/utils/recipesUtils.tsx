import axios from 'axios'

export const getRecipeById = async(id: any) => {
    const response = await axios.get<any>(`/recipes/${id}`)
    return response.data
}