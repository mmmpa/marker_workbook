// @flow

import IDMan from '../lib/decorators/id-man';

@IDMan
export default class Marker {
  id: number;
  x: number;
  y: number;
  thickness: number;
  length: number;
  rotation: number;

  constructor ({x, y, length, thickness, rotation}: MarkerParameters) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.thickness = thickness;
    this.rotation = rotation;
  }

  getEnd (): Position {
    const {
      x,
      y,
      radian,
      length,
    } = this;

    const endX = x + Math.cos(radian) * length;
    const endY = y + Math.sin(radian) * length;

    return { x: endX, y: endY };
  }

  to ({x, y}: Position): void {
    const moveX = x - this.x;
    const moveY = y - this.y;

    this.rotation = Math.atan2(moveY, moveX) * 180 / Math.PI;
    this.length = Math.sqrt(moveX * moveX + moveY * moveY);
  }

  wrapperCSS (scale: number): any {
    const {
      x,
      y,
      rotation,
    } = this;

    return {
      left: x * scale,
      top: (y - this.thickness / 2) * scale,
      transform: `rotate(${rotation}deg)`,
    };
  }

  innerCSS (scale: number): any {
    const {
      length,
      thickness,
    } = this;

    return {
      width: length * scale,
      height: thickness * scale,
    };
  }

  get radian (): number {
    return this.rotation * Math.PI / 180;
  }

  get forJSON (): MarkerParameters {
    const { x, y, length, rotation, thickness } = this;
    return { x, y, length, rotation, thickness };
  }

  static fromJSON (data: MarkerParameters): Marker {
    return new Marker(data);
  }
}
