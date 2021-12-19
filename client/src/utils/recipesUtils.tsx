import axios from 'axios'

type Id = {
    id: string
}

export const getRecipeById = async(id: Id) => {
    const response = await axios.get<any>(`/recipes/${id}`)
    return response.data
}