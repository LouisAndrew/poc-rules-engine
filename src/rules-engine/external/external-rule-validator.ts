/* eslint-disable prettier/prettier */
import axios from 'axios'
import { isEqual } from 'lodash'
import jp from 'jsonpath'

import { ExternalRule } from './type'

const requestExternalEndpoint = (url: string, method: 'POST', body: any) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  axios(url, {
    method,
    data: body,
  })

export const externalRuleValidator = async (
  factValue: any,
  externalRule: ExternalRule,
) => {
  const {
    endpoint, httpMethod, matches,
  } = externalRule

  try {
    const response = await requestExternalEndpoint(
      endpoint,
      httpMethod,
      factValue,
    )

    return matches.every(({ type, value, path }) => {
      if (type === 'statusCode') {
        return response.status === value
      }

      return isEqual(jp.query(response.data, path), value)
    })
  } catch (e) {
    console.log(e);
    return false
  }
}
