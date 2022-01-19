/* eslint-disable indent */
import { Engine, Event } from 'json-rules-engine'
import { zipCodeOperator } from '@/rules-engine/operator/fraud'
import { rules } from '@/rules-engine/rules/fraud'
import { EventScore, FRAUD_EVENTS } from '../rules/fraud/events'

/**
 * Setup a new engine
 */
const fraudEngine = new Engine([], {
  allowUndefinedFacts: true,
})

fraudEngine.addOperator(zipCodeOperator)
rules.forEach((rule) => {
  fraudEngine.addRule(rule)
})

export const calculateFraudScore = (successEvents: Event[]) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  successEvents
    .map(({ type }) => EventScore[type as FRAUD_EVENTS] ?? 0)
    .reduce((a, b) => a + b, 0)

export default fraudEngine
