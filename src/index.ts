import express, { json } from 'express'
import fraudEngine from '@/rules-engine/engine/fraud'
import engine from './engine'

const app = express()
const port = 8000

app.use(json())

app.get('/', (_, res) => {
  res.status(200).send()
})

app.get('/rules/foul', async (req, res) => {
  const facts = req.body
  const { events } = await engine.run(facts)
  res.status(200).send({
    events,
  })
})

app.get('/rules/fraud', async (req, res) => {
  const facts = req.body
  const runResult = await fraudEngine.run(facts)
  res.status(200).send(runResult)
})

app.listen(port, () => console.log(`Running on port ${port}`))
