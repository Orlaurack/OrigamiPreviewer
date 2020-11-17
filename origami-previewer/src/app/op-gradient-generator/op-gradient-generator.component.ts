import { Component, Input, OnInit } from '@angular/core';
import { ColorManagerService } from '../op-color-manager.service';
import { SolidSettingsService } from '../op-solid-settings.service';
import { SolidStarService } from '../op-solid-star.service';

@Component({
  selector: 'app-op-gradient-generator',
  templateUrl: './op-gradient-generator.component.html',
  styleUrls: ['./op-gradient-generator.component.scss']
})
export class OpGradientGeneratorComponent implements OnInit {
  colors = ['#FF0000', '#00FF00', '#0000FF', '#00FFFF', '#FF00FF', '#FFFF00'];
  color = '';
  active = undefined;
  @Input() colorManagerService: ColorManagerService;
  constructor() { }

  ngOnInit(): void {

  }

  generate(){
    const solid = new SolidStarService(new SolidSettingsService()).getIcosaedre();
    const mp = (a, b) => ({x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, z: (a.z + b.z) / 2});
    const coords = [
      mp(solid.A, solid.B), mp(solid.A, solid.C), mp(solid.B, solid.C), mp(solid.C, solid.H), mp(solid.B, solid.H), mp(solid.F, solid.H),
      mp(solid.B, solid.F), mp(solid.F, solid.G), mp(solid.B, solid.G), mp(solid.A, solid.G), mp(solid.E, solid.G), mp(solid.A, solid.E),
      mp(solid.A, solid.I), mp(solid.E, solid.I), mp(solid.C, solid.I), mp(solid.D, solid.I), mp(solid.C, solid.D), mp(solid.D, solid.H),
      mp(solid.D, solid.J), mp(solid.H, solid.J), mp(solid.F, solid.J), mp(solid.J, solid.L), mp(solid.F, solid.L), mp(solid.G, solid.L),
      mp(solid.E, solid.L), mp(solid.K, solid.L), mp(solid.E, solid.K), mp(solid.I, solid.K), mp(solid.J, solid.K), mp(solid.D, solid.K)
    ];
    let maxX = 0;
    let maxY = 0;
    let maxZ = 0;
    let minX = 0;
    let minY = 0;
    let minZ = 0;

    for (const coord of coords)
    {
      if (coord.x > maxX){
        maxX = coord.x;
      }else if (coord.x < minX){
        minX = coord.x;
      }
      if (coord.y > maxY){
        maxY = coord.y;
      }else if (coord.y < minY){
        minY = coord.y;
      }
      if (coord.z > maxZ){
        maxZ = coord.z;
      }else if (coord.z < minZ){
        minZ = coord.z;
      }
    }

    const calculeColor = (coord) => {
      let xRatio = ((coord.x - minX) / (maxX - minX) - 0.5) * 2.5;
      let yRatio = ((coord.y - minY) / (maxY - minY) - 0.5) * 2.5;
      let zRatio = ((coord.z - minZ) / (maxZ - minZ) - 0.5) * 2.5;


      xRatio += (1 - xRatio) / 5;
      yRatio += (1 - yRatio) / 5;
      zRatio += (1 - zRatio) / 5;

      const getRatio = (c: string) => {

        return {
          r: parseInt(c[1] + c[2], 16),
          g: parseInt(c[3] + c[4], 16),
          b: parseInt(c[5] + c[6], 16),
        };
      };
      const ratioColors = [];
      for (const color of this.colors){
        ratioColors.push(getRatio(color));
      }
      let result = {
        r: Math.round(
          Math.min(255, (
            (xRatio > 0 ? xRatio * ratioColors[0].r : (-xRatio) * ratioColors[3].r) +
            (yRatio > 0 ? yRatio * ratioColors[1].r : (-yRatio) * ratioColors[4].r) +
            (zRatio > 0 ? zRatio * ratioColors[2].r : (-zRatio) * ratioColors[5].r)
            ) / 1.5)
        ).toString(16),
        g: Math.round(
          Math.min(255, (
            (xRatio > 0 ? xRatio * ratioColors[0].g : (-xRatio) * ratioColors[3].g) +
            (yRatio > 0 ? yRatio * ratioColors[1].g : (-yRatio) * ratioColors[4].g) +
            (zRatio > 0 ? zRatio * ratioColors[2].g : (-zRatio) * ratioColors[5].g)
            ) / 1.5)
        ).toString(16),
        b: Math.round(
          Math.min(255, (
            (xRatio > 0 ? xRatio * ratioColors[0].b : (-xRatio) * ratioColors[3].b) +
            (yRatio > 0 ? yRatio * ratioColors[1].b : (-yRatio) * ratioColors[4].b) +
            (zRatio > 0 ? zRatio * ratioColors[2].b : (-zRatio) * ratioColors[5].b)
          ) / 1.5)
        ).toString(16)
      };
      if (result.r.length < 2){result.r = '0' + result.r; }
      if (result.g.length < 2){result.g = '0' + result.g; }
      if (result.b.length < 2){result.b = '0' + result.b; }
      return '#' + result.r + result.g + result.b;

    };
    let i = 0;
    for (const coord of coords){
      this.colorManagerService.storedColors[i].color = calculeColor(coord);
      i++;
    }
  }

  updateSelected($event){
    this.colors[this.active] = $event;
  }
  close(){
    this.active = undefined;
  }

  selectColor(i, cp){
    if (this.active === i){
      close();
    }else{
      this.active = i;
      this.color = this.colors[i];
      cp.setColor(this.color);
    }
  }
}
