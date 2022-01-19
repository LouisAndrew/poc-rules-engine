/* eslint-disable indent */
import { Engine, Event } from 'json-rules-engine'
import { zipCodeOperator } from '@/rules-engine/operator/fraud'
import { rules } from '@/rules-engine/rules/fraud'
import { EventScore, FRAUD_EVENTS } from '@/rules-engine/rules/fraud/events'
import { sampleExternalRule } from '@/rules-engine/external/const'
import { initializeExternalRule } from '../external'
/**
 * Setup a new engine
 */
const fraudEngine = new Engine([], {
  allowUndefinedFacts: true,
})
// Add external rule here

fraudEngine.addOperator(zipCodeOperator)
initializeExternalRule(fraudEngine, sampleExternalRule)
rules.forEach((rule) => {
  fraudEngine.addRule(rule)
})

export const calculateFraudScore = (successEvents: Event[]) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  successEvents
    .map(({ type }) => EventScore[type as FRAUD_EVENTS] ?? 0)
    .reduce((a, b) => a + b, 0)

export default fraudEngine
