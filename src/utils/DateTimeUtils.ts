export class DateTimeUtils {
  public static getHumanReadableTime(grommetTimeString: string): string {
    return grommetTimeString.substr(1)
  }
}