// eslint-disable-next-line no-shadow
export enum FRAUD_EVENTS {
  ZIP_BLACKLIST = 'blacklisted-zip',
  OUT_OF_HOME_AREA = 'out-of-home-area',
  NAME_BLACKLISTED = 'name-blacklisted',
  CHAINED = 'chained',
}

export const EventScore: Record<FRAUD_EVENTS, number> = {
  [FRAUD_EVENTS.ZIP_BLACKLIST]: 0.15,
  [FRAUD_EVENTS.OUT_OF_HOME_AREA]: 0.3,
  [FRAUD_EVENTS.NAME_BLACKLISTED]: 0.25,
  [FRAUD_EVENTS.CHAINED]: 0.3,
}
