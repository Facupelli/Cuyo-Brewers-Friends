import axios from 'axios'

export const getRecipeById = async(id: any) => {
    const response = await axios.get<any>(`/recipe/${id}`)
    return response.data
}