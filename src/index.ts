import express, { json } from 'express'
import fraudEngine, { calculateFraudScore } from '@/rules-engine/engine/fraud'
import engine from './engine'

const app = express()
const port = 8000

app.use(json())

app.get('/', (_, res) => {
  res.status(200).send()
})

app.post('/rules/foul', async (req, res) => {
  const facts = req.body
  const { events } = await engine.run(facts)
  res.status(200).send({
    events,
  })
})

app.post('/rules/fraud', async (req, res) => {
  const facts = req.body
  const { events } = await fraudEngine.run(facts)
  const fraudScore = parseFloat(calculateFraudScore(events).toFixed(2))
  res.status(200).send({ events, fraudScore })
})

app.listen(port, () => console.log(`Running on port ${port}`))
