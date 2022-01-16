import { Rule } from 'json-rules-engine'
import { FRAUD_EVENTS } from './events'

export const chainedRule = new Rule({
  conditions: {
    all: [
      {
        fact: FRAUD_EVENTS.NAME_BLACKLISTED,
        operator: 'equal',
        value: true,
      },
      {
        fact: FRAUD_EVENTS.OUT_OF_HOME_AREA,
        operator: 'equal',
        value: true,
      },
    ],
  },
  event: {
    type: FRAUD_EVENTS.CHAINED,
  },
  onFailure: (_, alm) => console.log(alm),
})
