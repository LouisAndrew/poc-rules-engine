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
  const { events, almanac } = await fraudEngine.run(facts)
  const fraudScore = await calculateFraudScore(events, almanac)
  const formattedScore = parseFloat(fraudScore.toFixed(2))
  res.status(200).send({ events, fraudScore: formattedScore })
})

app.listen(port, () => console.log(`Running on port ${port}`))
