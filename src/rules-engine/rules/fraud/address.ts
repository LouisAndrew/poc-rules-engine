import { Rule } from 'json-rules-engine'
import { FRAUD_EVENTS } from './events'

/**
 * @description Check if customer is within the current blacklisted ZIP and city combination
 */
export const blacklistedZip = new Rule({
  conditions: {
    all: [
      {
        fact: 'zip',
        operator: 'zip-code-op',
        value: '103', // Blacklisted ZIP code
      },
      {
        fact: 'city',
        operator: 'equal',
        value: 'Berlin', // Blacklisted city
      },
    ],
  },
  event: {
    type: FRAUD_EVENTS.ZIP_BLACKLIST,
  },
  onSuccess: (_, almanac) => {
    almanac.addRuntimeFact(FRAUD_EVENTS.ZIP_BLACKLIST, true)
  },
})

/**
 * @description Check if the city of a customer is out of the current home area
 */
export const outOfHomeArea = new Rule({
  conditions: {
    all: [
      {
        fact: 'city',
        operator: 'notIn',
        value: ['Berlin', 'Hamburg', 'Frankfurt'],
      },
    ],
  },
  event: {
    type: FRAUD_EVENTS.OUT_OF_HOME_AREA,
  },
  priority: 10, // Ensures being run before the chained rule
  onSuccess: (_, alm) => {
    alm.addRuntimeFact(FRAUD_EVENTS.OUT_OF_HOME_AREA, true)
  },
})
