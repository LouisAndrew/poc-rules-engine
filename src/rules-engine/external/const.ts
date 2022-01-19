import { ExternalRule } from './type'

export const sampleExternalRule: ExternalRule = {
  name: 'validate-zip',
  endpoint: 'http://localhost:5000/validate-address',
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
      value: true,
    },
  ],
}
