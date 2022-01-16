import { Engine } from 'json-rules-engine'
import { zipCodeOperator } from '@/rules-engine/operator/fraud'
import { rules } from '@/rules-engine/rules/fraud'

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

export default fraudEngine
