/* eslint-disable prettier/prettier */
import { Engine } from 'json-rules-engine';
import { externalRuleValidator } from './external-rule-validator';

import { ExternalRule } from './type';

export const initializeExternalRule = (
  engine: Engine,
  externalRule: ExternalRule,
) => {
  const {
    factPath, factId, name, score,
  } = externalRule;

  engine.addFact(name, async (_, alm) => {
    const factValue = await alm.factValue(factId, {}, factPath)
    const validatedValue = await externalRuleValidator({ [factId]: factValue }, externalRule)
    return validatedValue
  })

  const eventType = `${name}--external-validation`

  engine.addRule({
    name: eventType,
    conditions: {
      all: [
        {
          fact: name,
          operator: 'equal',
          value: true,
        },
      ],
    },
    priority: 5,
    event: {
      type: eventType,
    },
    onSuccess: (_, alm) => {
      alm.addRuntimeFact(eventType, true)
      alm.addRuntimeFact(`external-score--${name}`, score)
    },
  })
};
