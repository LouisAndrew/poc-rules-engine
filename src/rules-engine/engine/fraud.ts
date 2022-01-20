/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import { Almanac, Engine, Event } from 'json-rules-engine'
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

export const calculateFraudScore = async (
  successEvents: Event[],
  alm: Almanac,
) => {
  const scores = await Promise.all(
    successEvents.map(async ({ type }) => {
      const EXTERNAL_RULE_IDENTIFIER = '--external-validation'
      if (type.includes(EXTERNAL_RULE_IDENTIFIER)) {
        const externalRuleName = type.split(EXTERNAL_RULE_IDENTIFIER)[0]
        const value = await alm.factValue(`external-score--${externalRuleName}`)
        return value as number ?? 0
      }

      return EventScore[type as FRAUD_EVENTS] ?? 0
    }),
  )
  return scores.reduce((a, b) => a + b, 0)
}
// eslint-disable-next-line implicit-arrow-linebreak

export default fraudEngine
