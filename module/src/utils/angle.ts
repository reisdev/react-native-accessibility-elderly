/*
 * Convert from degrees to radians
 */

class AngleUtils {

  /**
   * Convert from degrees to radians
   */
  static radians(degrees: number) {
    return (degrees * Math.PI) / 180;
  }

  /**
   * Convert from radians to degrees
   */
  static degrees(radians: number) {
    return (radians * 180) / Math.PI;

  }

  /*
  * Calculate the angle between two lines
  */
  static angleBetweenLines(fX: number, fY: number, sX: number, sY: number, nfX: number, nfY: number, nsX: number, nsY: number): number {
    const angle1 = Math.atan2(fY - sY, fX - sX);
    const angle2 = Math.atan2(nfY - nsY, nfX - nsX);

    let angle = this.degrees(angle1 - angle2) % 360;
    if (angle < -180) {
      angle += 360.0;
    }
    if (angle > 180) {
      angle -= 360.0;
    }
    return angle;
  }
}

export default AngleUtils
