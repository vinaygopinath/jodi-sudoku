import { assert } from 'console'
import { Key } from 'grommet-icons'
import * as KeyboardUtils from './KeyboardUtils'

function getKeyboardEvent(
  key: string,
  isCtrl: boolean = false,
  isMetaKey: boolean = false,
  isAltKey: boolean = false,
  isShiftKey: boolean = false
): React.KeyboardEvent<HTMLElement> {
  return new KeyboardEvent('keydown', {
    key: key,
    ctrlKey: isCtrl,
    metaKey: isMetaKey,
    altKey: isAltKey,
    shiftKey: isShiftKey
  }) as unknown as React.KeyboardEvent<HTMLElement>
}

function getKeyboardEvents(keys: string[]): React.KeyboardEvent<HTMLElement>[] {
  return keys.map(key => getKeyboardEvent(key))
}

describe('KeyboardUtils', () => {

  describe('isDeleteOrBackspaceKey', () => {

    it('should return true for delete key', () => {
      const event = getKeyboardEvent('Delete')

      expect(KeyboardUtils.isDeleteOrBackspaceKey(event)).toBeTrue()
    })

    it('should return true for backspace key', () => {
      const event = getKeyboardEvent('Backspace')

      expect(KeyboardUtils.isDeleteOrBackspaceKey(event)).toBeTrue()
    })

    it('should return false for other keys', () => {
      const letterMEvent = getKeyboardEvent('M')
      const upArrowEvent = getKeyboardEvent('Up')

      expect(KeyboardUtils.isDeleteOrBackspaceKey(letterMEvent)).toBeFalse()
      expect(KeyboardUtils.isDeleteOrBackspaceKey(upArrowEvent)).toBeFalse()
    })
  })

  describe('isArrowKey', () => {

    it(`should return true for Chrome's Up, Down, Left and Right keys`, () => {
      getKeyboardEvents(['Up', 'Down', 'Left', 'Right'])
        .forEach(keyEvent => {
          expect(KeyboardUtils.isArrowKey(keyEvent)).toBeTrue()
        })
    })

    it(`should return true for Firefox's ArrowUp, ArrowDown, ArrowLeft and ArrowRight keys`, () => {
      getKeyboardEvents(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'])
        .forEach(keyEvent => {
          expect(KeyboardUtils.isArrowKey(keyEvent)).toBeTrue()
        })
    })

    it('should return false for other keys', () => {
      getKeyboardEvents(['A', '3', '&', '^'])
        .forEach(keyEvent => {
          expect(KeyboardUtils.isArrowKey(keyEvent)).toBeFalse()
        })
    })
  })

  describe('getArrowKey', () => {

    it('should return ArrowKey.UP when the key is Up or ArrowUp', () => {
      const event = getKeyboardEvent('Up')
      const arrowEvent = getKeyboardEvent('ArrowUp')

      expect(KeyboardUtils.getArrowKey(event)).toBe(KeyboardUtils.ArrowKey.UP)
      expect(KeyboardUtils.getArrowKey(arrowEvent)).toBe(KeyboardUtils.ArrowKey.UP)
    })

    it('should return ArrowKey.DOWN when the key is Down or ArrowDown', () => {
      const event = getKeyboardEvent('Down')
      const arrowEvent = getKeyboardEvent('ArrowDown')

      expect(KeyboardUtils.getArrowKey(event)).toBe(KeyboardUtils.ArrowKey.DOWN)
      expect(KeyboardUtils.getArrowKey(arrowEvent)).toBe(KeyboardUtils.ArrowKey.DOWN)
    })

    it('should return ArrowKey.LEFT when the key is Left or ArrowLeft', () => {
      const event = getKeyboardEvent('Left')
      const arrowEvent = getKeyboardEvent('ArrowLeft')

      expect(KeyboardUtils.getArrowKey(event)).toBe(KeyboardUtils.ArrowKey.LEFT)
      expect(KeyboardUtils.getArrowKey(arrowEvent)).toBe(KeyboardUtils.ArrowKey.LEFT)
    })

    it('should return ArrowKey.RIGHT when the key is Right or ArrowRight', () => {
      const event = getKeyboardEvent('Right')
      const arrowEvent = getKeyboardEvent('ArrowRight')

      expect(KeyboardUtils.getArrowKey(event)).toBe(KeyboardUtils.ArrowKey.RIGHT)
      expect(KeyboardUtils.getArrowKey(arrowEvent)).toBe(KeyboardUtils.ArrowKey.RIGHT)
    })

    it('should throw an Error if the key is not an arrow key', () => {
      getKeyboardEvents(['5', 'o', '*', '!'])
        .forEach(keyEvent => {
          expect(() => {
            KeyboardUtils.getArrowKey(keyEvent)
          }).toThrow()
        })
    })
  })

  describe('isCellValueKey', () => {

    it('should should return true when a key in the range 1 - 9 is pressed', () => {
      getKeyboardEvents(['1', '2', '3', '4', '5', '6', '7', '8', '9'])
        .forEach(keyEvent => {
          expect(KeyboardUtils.isCellValueKey(keyEvent)).toBeTrue()
        })
    })

    it('should return false when a modifier key is pressed', () => {
      ['1', '2', '3']
        .map(key => getKeyboardEvent(key, true))
        .forEach(keyEvent => {
          expect(KeyboardUtils.isCellValueKey(keyEvent)).toBeFalse()
        });

      ['4', '5', '6']
        .map(key => getKeyboardEvent(key, false, true))
        .forEach(keyEvent => {
          expect(KeyboardUtils.isCellValueKey(keyEvent)).toBeFalse()
        });

      ['7', '8', '9']
        .map(key => getKeyboardEvent(key, false, false, true))
        .forEach(keyEvent => {
          expect(KeyboardUtils.isCellValueKey(keyEvent)).toBeFalse()
        });
    })

    it('should return false for other keys', () => {
      getKeyboardEvents(['0', 'r', '%', '~'])
        .forEach(keyEvent => {
          expect(KeyboardUtils.isCellValueKey(keyEvent)).toBeFalse()
        })
    })
  })

  describe('isUndoKey', () => {

    it('should return true when Ctrl+z or Ctrl+Z is pressed', () => {
      const undoEvent = getKeyboardEvent('z', true)
      const undoUppercaseEvent = getKeyboardEvent('Z', true)

      expect(KeyboardUtils.isUndoKey(undoEvent)).toBeTrue()
      expect(KeyboardUtils.isUndoKey(undoUppercaseEvent)).toBeTrue()
    })

    it('should return false when ctrl+z is pressed with other modifiers', () => {
      const undoEventsWithModifiers = [
        getKeyboardEvent('z', true, true), // Meta + Ctrl + z
        getKeyboardEvent('z', true, false, true), // Ctrl + Alt + z
        getKeyboardEvent('z', true, false, false, true) // Ctrl + Shift + z
      ]

      undoEventsWithModifiers.forEach(event => {
        expect(KeyboardUtils.isUndoKey(event)).toBeFalse()
      })
    })

    it('should return false for the redo combination', () => {
      const redoEvent = getKeyboardEvent('z', true, false, false, true)

      expect(KeyboardUtils.isUndoKey(redoEvent)).toBeFalse()
    })

    it('should return false for other keys', () => {
      getKeyboardEvents(['0', 'r', '%', '~'])
      .forEach(keyEvent => {
        expect(KeyboardUtils.isUndoKey(keyEvent)).toBeFalse()
      })
    })
  })

  describe('isRedoKey', () => {

    it('should return true when Ctrl+shift+z or Ctrl+shift+Z is pressed', () => {
      const redoEvent = getKeyboardEvent('z', true, false, false, true)
      const redoUppercaseEvent = getKeyboardEvent('Z', true, false, false, true)

      expect(KeyboardUtils.isRedoKey(redoEvent)).toBeTrue()
      expect(KeyboardUtils.isRedoKey(redoUppercaseEvent)).toBeTrue()
    })

    it('should return false when ctrl+shift+z is pressed with other modifiers', () => {
      const redoEventsWithModifiers = [
        getKeyboardEvent('z', true, true, false, true), // Meta + Ctrl + Shift + z
        getKeyboardEvent('z', true, false, true, true), // Ctrl + Alt + Shift + z
      ]

      redoEventsWithModifiers.forEach(event => {
        expect(KeyboardUtils.isRedoKey(event)).toBeFalse()
      })
    })

    it('should return false for the undo combination', () => {
      const undoEvent = getKeyboardEvent('z', true)

      expect(KeyboardUtils.isRedoKey(undoEvent)).toBeFalse()
    })

    it('should return false for other keys', () => {
      getKeyboardEvents(['0', 'r', '%', '~'])
      .forEach(keyEvent => {
        expect(KeyboardUtils.isRedoKey(keyEvent)).toBeFalse()
      })
    })
  })

  describe('getCellValueKey', () => {

    it('should return a CellValueRange if a digit in the range of 1 - 9 is entered', () => {
      ['1', '2', '3', '4', '5', '6', '7', '8', '9']
      .forEach(digit => {
        const keyEvent = getKeyboardEvent(digit)

        const cellValue = KeyboardUtils.getCellValueKey(keyEvent)

        expect(cellValue).toBe(parseInt(digit))
      })
    })

    it('should throw an error for other keys', () => {
      getKeyboardEvents(['0', 'k', '$'])
        .forEach(keyEvent => {
          expect(() => {
            KeyboardUtils.getCellValueKey(keyEvent)
          }).toThrow()
        })
    })
  })

  describe('isKeyToBeSilentlyConsumed', () => {

    it('should return true for alphanumeric characters without modifiers', () => {
      getKeyboardEvents(['a', 'f', 'l', 's', '9', '0', 'ą', 'ಅ'])
      .forEach(keyEvent => {
        expect(KeyboardUtils.isKeyToBeSilentlyConsumed(keyEvent)).toBeTrue()
      })
    })

    it('should return false if a modifier key is pressed', () => {
      [
        getKeyboardEvent('z', true),
        getKeyboardEvent('p', false, true),
        getKeyboardEvent('r', false, false, true)
      ].forEach(keyEvent => {
        expect(KeyboardUtils.isKeyToBeSilentlyConsumed(keyEvent)).toBeFalse()
      })
    })

    it('should return false if the key is not alphanumeric', () => {

    })

  })
})

