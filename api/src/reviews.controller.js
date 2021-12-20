const ReviewsDAO = require ('../dao/reviewsDAO.js')
const dayjs =  require ('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const review = {
        score: req.body.review.score,
        comment: req.body.review.comment,
        recipe_id: req.body.review.recipe_id,
      }
      const userInfo = {
        username: req.body.username,
        user_id: req.body.user_id
      }
      const date = dayjs().format('DD/MM/YYYY HH:mm')

      const ReviewResponse = await ReviewsDAO.addReview(
        userInfo,
        review,
        date,
      )

      console.log("MONGO CREATE", ReviewResponse);

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetReviewByRecipeId(req,res,next){
    try{
      const {id} = req.params
      const reviews = await ReviewsDAO.getReviewsByRecipeId(id);

      res.json(reviews)
    }catch(e){
      res.status(500).json({error:e.message})
    }
  }

  // static async apiUpdateReview(req, res, next) {
  //   try {
  //     const reviewId = req.body.review_id
  //     const text = req.body.text
  //     const date = new Date()

  //     const reviewResponse = await ReviewsDAO.updateReview(
  //       reviewId,
  //       req.body.user_id,
  //       text,
  //       date,
  //     )

  //     let { error } = reviewResponse
  //     if (error) {
  //       res.status(400).json({ error })
  //     }

  //     if (reviewResponse.modifiedCount === 0) {
  //       throw new Error(
  //         "unable to update review - user may not be original poster",
  //       )
  //     }

  //     res.json({ status: "success" })
  //   } catch (e) {
  //     res.status(500).json({ error: e.message })
  //   }
  // }

  // static async apiDeleteReview(req, res, next) {
  //   try {
  //     const reviewId = req.query.id
  //     const userId = req.body.user_id
  //     console.log(reviewId)
  //     const reviewResponse = await ReviewsDAO.deleteReview(
  //       reviewId,
  //       userId,
  //     )
  //     res.json({ status: "success" })
  //   } catch (e) {
  //     res.status(500).json({ error: e.message })
  //   }
  // }

}

module.exports = {ReviewsController}