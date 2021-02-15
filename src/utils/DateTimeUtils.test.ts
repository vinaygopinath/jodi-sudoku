import { DateTimeUtils } from './DateTimeUtils'

describe('DateTime utils', () => {

  describe('Human readable time', () => {

    it('should format Grommet time', () => {
      const input = 'T04:45:56'
      const expectedOutput = '04:45:56'

      expect(DateTimeUtils.getHumanReadableTime(input)).toEqual(expectedOutput)
    });

  });

});