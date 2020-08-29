import { CellValueRange, RowRange } from "../store/game/game-types"

export enum ArrowKey {
  UP,
  DOWN,
  RIGHT,
  LEFT
}

export function isDeleteOrBackspaceKey(event: React.KeyboardEvent<HTMLElement>): boolean {
  return ["Delete", "Backspace"].includes(event.key)
}

export function isArrowKey(event: React.KeyboardEvent<HTMLElement>): boolean {
  return ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Left", "Right", "Up", "Down"].includes(event.key)
}

export function isCellValueKey(event: React.KeyboardEvent<HTMLElement>): boolean {
  return ["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.key)
}

export function getArrowKey(event: React.KeyboardEvent<HTMLElement>): ArrowKey {
  switch (event.key) {
    case "ArrowUp": return ArrowKey.UP
    case "ArrowDown": return ArrowKey.DOWN
    case "ArrowRight": return ArrowKey.RIGHT
    case "ArrowLeft": return ArrowKey.LEFT
    default: throw Error(`getArrowKey was called when the key ${event.key} is not an arrow key. Did you call "isArrowKey" before calling this method?`)
  }
}

export function getCellValueKey(event: React.KeyboardEvent<HTMLElement>): CellValueRange {
  return parseInt(event.key) as CellValueRange
}

export function handleNumberKey(
  event: React.KeyboardEvent<HTMLElement>,
  func: (number: RowRange) => any
) {
  switch (event.key) {
    case "1": func(1); break;
    case "2": func(2); break;
    case "3": func(3); break;
    case "4": func(4); break;
    case "6": func(6); break;
    case "5": func(5); break;
    case "7": func(7); break;
    case "9": func(9); break;
    case "8": func(8); break;
    default: console.error(`Unexpected key ${event.key} was pressed`)
  }
}

