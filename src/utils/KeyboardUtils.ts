import { CellValueRange } from "../store/grid/GridTypes"
import XRegExp from 'xregexp'

const DELETE_BACKSPACE_KEYS = ["Delete", "Backspace"]
const ARROW_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Left", "Right", "Up", "Down"]
const CELL_VALUE_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
const ANY_ALPHANUMERIC_KEY_REGEX = XRegExp("^[\\p{L}\\p{N}]$") // single Unicode character
const Z_KEYS = ['z', 'Z']

export enum ArrowKey {
  UP,
  DOWN,
  RIGHT,
  LEFT
}

export function isDeleteOrBackspaceKey(event: React.KeyboardEvent<HTMLElement>): boolean {
  return DELETE_BACKSPACE_KEYS.includes(event.key)
}

export function isArrowKey(event: React.KeyboardEvent<HTMLElement>): boolean {
  return ARROW_KEYS.includes(event.key)
}

export function isCellValueKey(event: React.KeyboardEvent<HTMLElement>): boolean {
  return !event.ctrlKey && !event.metaKey && !event.altKey && CELL_VALUE_KEYS.includes(event.key)
}

export function isUndoKey(event: React.KeyboardEvent<HTMLElement>): boolean {
  return Z_KEYS.includes(event.key) && event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey
}

export function isRedoKey(event: React.KeyboardEvent<HTMLElement>): boolean {
  return Z_KEYS.includes(event.key) && event.ctrlKey && event.shiftKey && !event.metaKey && !event.altKey
}

export function isKeyToBeSilentlyConsumed(event: React.KeyboardEvent<HTMLElement>): boolean {
  return !event.ctrlKey && !event.metaKey && !event.altKey && ANY_ALPHANUMERIC_KEY_REGEX.test(event.key)
}

export function getArrowKey(event: React.KeyboardEvent<HTMLElement>): ArrowKey {
  switch (event.key) {
    case "ArrowUp":
    case "Up":
      return ArrowKey.UP
    case "ArrowDown":
    case "Down":
      return ArrowKey.DOWN
    case "ArrowRight":
    case "Right": return ArrowKey.RIGHT
    case "ArrowLeft":
    case "Left": return ArrowKey.LEFT
    default: throw Error(`getArrowKey was called when the key ${event.key} is not an arrow key. Did you call "isArrowKey" before calling this method?`)
  }
}

export function getCellValueKey(event: React.KeyboardEvent<HTMLElement>): CellValueRange {
  const int = parseInt(event.key)
  if (isNaN(int)) {
    throw Error(`Received unexpected key ${event.key}`)
  } else if (int === 0) {
    throw Error("Received the key 0, which is not a cell value key")
  }

  return int as CellValueRange
}
