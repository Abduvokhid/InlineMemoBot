import express, {Application} from 'express'
import cors from 'cors'

function setup (app: Application) {
  app.use(cors({
    origin: '*',
    methods: 'post'
  }))
  app.use(express.json())
}

export default { setup }
