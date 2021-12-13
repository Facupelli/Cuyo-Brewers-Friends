import express from 'express'

const router = express.Router()  //acess to express router

router.route('/').get((req, res) => res.send('hello world')) //demostration route

export default router