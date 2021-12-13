import express from 'express'
import RestaurantsCtrl from './restaurants.controller.js'

const router = express.Router()  //acess to express router

router.route('/').get(RestaurantsCtrl.apiGetRestaurants) //demostration route

export default router