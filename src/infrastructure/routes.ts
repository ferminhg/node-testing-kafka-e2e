import { Router } from 'express'

const routes = Router()

routes.get('/status', (req, res) => {
  return res.json({ message: 'ok' })
})
export default routes
