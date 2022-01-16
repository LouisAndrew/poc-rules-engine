import { blacklistedZip, outOfHomeArea } from './address'
import { nameBlacklisted } from './name'

// Note: order is important
export const rules = [blacklistedZip, outOfHomeArea, nameBlacklisted]
