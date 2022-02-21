import { Injectable, Input } from '@angular/core';
import { Coordinate } from 'src/app/op-coordinate';
import { SolidSettingsService } from './op-solid-settings.service';


@Injectable({
  providedIn: 'root'
})


export class RotationService {

  @Input() solidSettingsService: SolidSettingsService;
  lastRotation = [{x: 0, y: 0}, {x: 0, y: 0}];


  constructor(solidSettingsService: SolidSettingsService) {
    this.solidSettingsService = solidSettingsService;
  }

  rotatePoints(solid: any[], rotation: {x: number, y: number}) {
    if (rotation === undefined) {
      rotation = this.lastRotation[0];
    }
    this.lastRotation[0] = rotation;
    rotation.x = rotation.x * this.solidSettingsService.inertia;
    rotation.y = rotation.y * this.solidSettingsService.inertia;
    
    const rx = (rotation.y) % 360 * (Math.PI / 180) * 1;
    const ry = - (rotation.x) % 360 * (Math.PI / 180) * 1;

    const sinAnglex = Math.sin(rx);
    const cosAnglex = Math.cos(rx);
    const sinAngley = Math.sin(ry);
    const cosAngley = Math.cos(ry);
    const newSolid = [];
    for (const index in solid) {
      if (Object.prototype.hasOwnProperty.call(solid, index)) {
        const modules = solid[index];
        newSolid[index] = {};

        for (const p in modules) {
          if (Object.prototype.hasOwnProperty.call(modules, p)) {
            const point = modules[p];
            const pointMem = new Coordinate(point.x, point.y, point.z);
            const y = pointMem.y * cosAnglex - pointMem.z * sinAnglex;
            let z = pointMem.z * cosAnglex + pointMem.y * sinAnglex;
            const x = pointMem.x * cosAngley + z * sinAngley;
            z = z * cosAngley - pointMem.x * sinAngley;
            newSolid[index][p] = new Coordinate(x, y, z);
          }
        }
      }
    }
    return newSolid;
  }
}
