import axios from 'axios'

export const getReviewsByRecipeId = async(id: any) => {
    const response = await axios.get<any>(`/reviews?=${id}`)
    return response.data
}