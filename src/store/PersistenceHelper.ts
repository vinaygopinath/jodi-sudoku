import { RootState } from "./rootReducer";

const STATE_STORAGE_KEY = 'jodi-sudoku-app-state'

export class PersistenceHelper {

  /**
   * Attempts to restore the state of the app by retrieving
   * the state from localStorage.
   *
   * If the state is not found, or if the stored state has a data
   * corruption issue, a null value is returned
   */
  public static restoreState(): RootState | null {
    const storedStateStr = localStorage.getItem(STATE_STORAGE_KEY)
      || sessionStorage.getItem(STATE_STORAGE_KEY)
    let storedState: RootState | null = null;
    try {
      if (storedStateStr != null) {
        storedState = JSON.parse(storedStateStr) as RootState
      }
    } catch (err) {
      storedState = null
    }

    return storedState;
  }

  /**
   * Persists the state of the app to localStorage
   *
   * @param state
   */
  public static persistState(state: RootState) {
    localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(state))
  }

  /**
   * Clears the state from local storage
   */
  public static clearState() {
    localStorage.removeItem(STATE_STORAGE_KEY)
  }
}