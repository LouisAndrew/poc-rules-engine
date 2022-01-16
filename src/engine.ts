import { Engine } from 'json-rules-engine'

/**
 * Setup a new engine
 */
const engine = new Engine([], {
  // Otherwise, undefined fact would throw an error
  allowUndefinedFacts: true,
})

engine.addRule({
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'gameDuration',
            operator: 'equal',
            value: 40,
          },
          {
            fact: 'personalFoulCount',
            operator: 'greaterThanInclusive',
            value: 5,
          },
        ],
      },
      {
        all: [
          {
            fact: 'gameDuration',
            operator: 'equal',
            value: 48,
          },
          {
            fact: 'personalFoulCount',
            operator: 'greaterThanInclusive',
            value: 6,
          },
        ],
      },
    ],
  },
  event: {
    type: 'fouledOut',
    params: {
      message: 'Player has fouled out!',
    },
  },
  onSuccess: (event, almanac, ruleResult) => {
    console.log('Rule succeeded')
  },
  onFailure: () => {
    console.log('Rule failed')
  },
})

export default engine
