import { Injectable } from '@angular/core';
import { Coordinate } from './op-coordinate';
import { OrigamiModule } from './op-module';
import { SolidSettingsService } from './op-solid-settings.service';

@Injectable({
  providedIn: 'root'
})
export class OpTetraedreService {

  solidSettingsService: SolidSettingsService;
  constructor(solidSettingsService: SolidSettingsService) {
    this.solidSettingsService = solidSettingsService;
  }

  getIcosaedre(size: number, picHeight: number) {

    const distance = 100 * size;
    const solid = [
        new Coordinate(distance, distance, distance),
        new Coordinate(-distance, -distance, distance),
        new Coordinate(distance, -distance, -distance),
        new Coordinate(-distance, distance, -distance),
    ];
    const staredSolid = [
      new OrigamiModule(picHeight * 3, solid[0], solid[1], solid[3], solid[2]),
      new OrigamiModule(picHeight * 3, solid[0], solid[2], solid[1], solid[3]),
      new OrigamiModule(picHeight * 3, solid[0], solid[3], solid[2], solid[1]),
      new OrigamiModule(picHeight * 3, solid[1], solid[2], solid[3], solid[0]),
      new OrigamiModule(picHeight * 3, solid[1], solid[3], solid[0], solid[2]),
      new OrigamiModule(picHeight * 3, solid[2], solid[3], solid[1], solid[0]),
    ];
    return staredSolid;
  }
}
