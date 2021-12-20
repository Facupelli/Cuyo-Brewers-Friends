import axios from 'axios'

export const getReviewsByRecipeId = async(id: unknown) => {
    const response = await axios.get<any>(`/review/${id}`)
    return response.data
}