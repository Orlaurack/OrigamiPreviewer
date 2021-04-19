import { Injectable } from '@angular/core';
import { Coordinate } from './op-coordinate';
import { OrigamiModule } from './op-module';
import { SolidSettingsService } from './op-solid-settings.service';

@Injectable({
  providedIn: 'root'
})
export class OpOctaedreService {

  solidSettingsService: SolidSettingsService;
  constructor(solidSettingsService: SolidSettingsService) {
    this.solidSettingsService = solidSettingsService;
  }

  getIcosaedre(size: number, picHeight: number) {

    const distance = 150 * size;
    const solid = [
      new Coordinate(0, 0, -distance),
      new Coordinate(0, -distance, 0),
      new Coordinate(-distance, 0, 0),
      new Coordinate(0, 0, distance),
      new Coordinate(0, distance, 0),
      new Coordinate(distance, 0, 0),
    ];
    const staredSolid = [
      new OrigamiModule(picHeight * 2, solid[0], solid[1], solid[5], solid[2]),
      new OrigamiModule(picHeight * 2, solid[1], solid[3], solid[5], solid[2]),
      new OrigamiModule(picHeight * 2, solid[3], solid[4], solid[5], solid[2]),
      new OrigamiModule(picHeight * 2, solid[4], solid[0], solid[5], solid[2]),

      new OrigamiModule(picHeight * 2, solid[2], solid[0], solid[4], solid[1]),
      new OrigamiModule(picHeight * 2, solid[3], solid[2], solid[4], solid[1]),
      new OrigamiModule(picHeight * 2, solid[5], solid[3], solid[4], solid[1]),
      new OrigamiModule(picHeight * 2, solid[0], solid[5], solid[4], solid[1]),

      new OrigamiModule(picHeight * 2, solid[1], solid[2], solid[3], solid[0]),
      new OrigamiModule(picHeight * 2, solid[2], solid[4], solid[3], solid[0]),
      new OrigamiModule(picHeight * 2, solid[4], solid[5], solid[3], solid[0]),
      new OrigamiModule(picHeight * 2, solid[5], solid[1], solid[3], solid[0]),
    ];
    return staredSolid;
  }
}
