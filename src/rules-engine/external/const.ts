import { ExternalRule } from './type'

/**
 * Check if address is invalid
 */
export const sampleExternalRule: ExternalRule = {
  name: 'validate-zip',
  endpoint: 'http://localhost:5001/validate-address',
  factId: 'zip',
  httpMethod: 'POST',
  matches: [
    {
      type: 'statusCode',
      value: 200,
    },
    {
      type: 'body',
      path: 'valid',
      value: false,
    },
  ],
}
