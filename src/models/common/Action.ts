export interface Action {
  type: any,
  payload?: any,
  skipPersist?: boolean
}