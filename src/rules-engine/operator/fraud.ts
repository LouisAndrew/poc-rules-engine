import { Operator } from 'json-rules-engine'

// eslint-disable-next-line prettier/prettier
export const zipCodeOperator = new Operator('zip-code-op', (fact: number, val: string) => fact.toString().includes(val))
