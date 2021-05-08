import { ActionsObservable, combineEpics, ofType, StateObservable } from "redux-observable";
import { EMPTY } from "rxjs";
import { Action } from '../../models/common/Action'
import { mergeMap } from "rxjs/operators";
import { RootState } from "../RootReducer";
import { CREATE_ROOM } from "./MultiplayerGameTypes";

export const multiplayerGameEpics = combineEpics(
  createRoom
)

export function createRoom(
  action$: ActionsObservable<Action>,
  state$: StateObservable<RootState>
) {
  return action$.pipe(
    ofType(CREATE_ROOM),
    mergeMap(action => {
      return EMPTY
    })
  )
}