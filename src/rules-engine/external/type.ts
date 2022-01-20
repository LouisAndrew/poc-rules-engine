export type Match = {
  /**
   * Match type.
   * @description Select `statusCode` if the status code should match the provided value.
   * @description Select `body` if the request body with the provided path should match the value.
   */
  type: 'statusCode' | 'body'
  /**
   * Path of the request body that should matches the provided value.
   * This property is required if the match type equals `body`.
   */
  path?: string
  /**
   * Provided value that should match.
   */
  value: any
}

export type ExternalRule = {
  name: string
  /**
   * Path of the HTTP endpoint, where the request should be sent.
   * TODO: Path replacement(s)
   * TODO @description use the `{something}` syntax to use a URL parameter.
   * TODO @example `{endpoint: 'http://localhost/{$}', factPath: 'name'}` would resolve to a request
   *      to `http://localhost/louis/`, if the fact provided has the `name: louis` property.
   */
  endpoint: string
  /**
   * Id of the fact, that would be sent to the HTTP endpoint.
   */
  factId: string
  /**
   * Path of the fact relative to the fact ID.
   */
  factPath?: string
  /**
   * HTTP Method to the external endpoint.
   * TODO: add more methods.
   */
  httpMethod: 'POST'
  matches: Match[]
  /**
   * Score to add on the fraud score if the rule succeeds.
   */
  score: number
}
