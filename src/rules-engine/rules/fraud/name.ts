import { Rule } from 'json-rules-engine'
import { FRAUD_EVENTS } from './events'

export const nameBlacklisted = new Rule({
  conditions: {
    any: [
      {
        fact: 'name',
        path: '$.firstName',
        operator: 'equal',
        value: 'Louis',
      },
      {
        fact: 'name',
        path: '$.lastName',
        operator: 'equal',
        value: 'Andrew',
      },
    ],
  },
  event: {
    type: FRAUD_EVENTS.NAME_BLACKLISTED,
  },
  onSuccess: (_, alm) => {
    alm.addRuntimeFact(FRAUD_EVENTS.NAME_BLACKLISTED, true)
  },
})
