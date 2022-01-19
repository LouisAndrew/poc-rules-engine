import { blacklistedZip, outOfHomeArea } from './address'
import { nameBlacklisted } from './name'
import { chainedRule } from './chained'

// Note: order is important
export const rules = [
  blacklistedZip,
  outOfHomeArea,
  nameBlacklisted,
  chainedRule,
]
