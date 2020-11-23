import { Injectable } from '@angular/core';
import { Coordinate } from './op-coordinate';
import { OrigamiModule } from './op-module';
import { SolidSettingsService } from './op-solid-settings.service';

@Injectable({
  providedIn: 'root'
})
export class OpIcosaedre120Service {

  solidSettingsService: SolidSettingsService;
  constructor(solidSettingsService: SolidSettingsService) {
    this.solidSettingsService = solidSettingsService;
  }

  getIcosaedre(size: number, picHeight: number) {

    const distance = (((Math.sqrt(5) + 1) / 2) * 200 / 2) * (size * 1.3);
    const demiscale = (200 / 2) * (size * 1.4);
    const solid = [
        new Coordinate(0, -demiscale, -distance),
        new Coordinate(0, demiscale, -distance),
        new Coordinate(-distance, 0, -demiscale),
        new Coordinate(-distance, 0, demiscale),
        new Coordinate(demiscale, -distance, 0),
        new Coordinate(demiscale, distance, 0),
        new Coordinate(distance, 0, -demiscale),
        new Coordinate(-demiscale, distance, 0),
        new Coordinate(-demiscale, -distance, 0),
        new Coordinate(0, demiscale, distance),
        new Coordinate(0, -demiscale, distance),
        new Coordinate(distance, 0, demiscale)
    ];
    const staredSolid = [];
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[0], solid[1], solid[2], solid[6]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[0], solid[2], solid[8], solid[1]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[1], solid[2], solid[0], solid[7]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[2], solid[7], solid[3], solid[1]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[1], solid[7], solid[2], solid[5]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[5], solid[7], solid[1], solid[9]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[1], solid[5], solid[7], solid[6]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[5], solid[6], solid[11], solid[1]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[1], solid[6], solid[5], solid[0]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[0], solid[6], solid[1], solid[4]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[4], solid[6], solid[0], solid[11]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[0], solid[4], solid[6], solid[8]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[0], solid[8], solid[4], solid[2]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[4], solid[8], solid[10], solid[0]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[2], solid[8], solid[0], solid[3]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[3], solid[8], solid[2], solid[10]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[2], solid[3], solid[8], solid[7]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[3], solid[7], solid[9], solid[2]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[3], solid[9], solid[10], solid[7]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[7], solid[9], solid[3], solid[5]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[5], solid[9], solid[7], solid[11]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[9], solid[11], solid[10], solid[5]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[5], solid[11], solid[9], solid[6]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[6], solid[11], solid[5], solid[4]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[4], solid[11], solid[6], solid[10]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[10], solid[11], solid[4], solid[9]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[4], solid[10], solid[11], solid[8]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[8], solid[10], solid[4], solid[3]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[9], solid[10], solid[3], solid[11]));
    Array.prototype.push.apply(staredSolid, this.multiplyBy4(picHeight, solid[3], solid[10], solid[8], solid[9]));

    return staredSolid;
  }
  multiplyBy4(picHeight: number, A: Coordinate, B: Coordinate, AB: Coordinate, BA: Coordinate) {
    //    ab       ab
    //    /\       /\
    //   /  \     /\/\
    //  a----b   a----b
    //   \  /     \/\/
    //    \/       \/
    //    ba       ba

    return [
      new OrigamiModule(picHeight / 2, this.centerOf(AB, A), this.centerOf(AB, B), AB, this.centerOf(A, B)),
      new OrigamiModule(picHeight / 2, A, this.centerOf(A, B), this.centerOf(A, AB), this.centerOf(A, BA)),
      new OrigamiModule(picHeight / 2, this.centerOf(B, A), B, this.centerOf(B, AB), this.centerOf(B, BA)),
      new OrigamiModule(picHeight / 2, this.centerOf(BA, A), this.centerOf(BA, B), this.centerOf(A, B), BA)
    ];
  }
  centerOf(a: Coordinate, b: Coordinate) {
    let x = a.x + b.x;
    let y = a.y + b.y;
    let z = a.z + b.z;
    x *= 1;
    y *= 1;
    z *= 1;
    return new Coordinate(x / 2, y / 2, z / 2);
  }

}
