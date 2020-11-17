import { Injectable, Input, ɵConsole } from '@angular/core';
import { Coordinate } from 'src/app/op-coordinate';
import { OrigamiModule } from 'src/app/op-module';
import { SolidSettingsService } from './op-solid-settings.service';

@Injectable()
export class SolidStarService {

  readonly size: number;
  solidSettingsService: SolidSettingsService;

  constructor(solidSettingsService: SolidSettingsService) {
    this.solidSettingsService = solidSettingsService;
    this.size = 1;
  }

  getIcosaedre(){
    const distance = (((Math.sqrt(5) + 1) / 2) * 200 / 2) * this.size;
    const demiscale = (200 / 2) * this.size;
    return {
        A: new Coordinate(0, -demiscale, -distance),
        B: new Coordinate(0, demiscale, -distance),
        C: new Coordinate(-distance, 0, -demiscale),
        D: new Coordinate(-distance, 0, demiscale),
        E: new Coordinate(demiscale, -distance, 0),
        F: new Coordinate(demiscale, distance, 0),
        G: new Coordinate(distance, 0, -demiscale),
        H: new Coordinate(-demiscale, distance, 0),
        I: new Coordinate(-demiscale, -distance, 0),
        J: new Coordinate(0, demiscale, distance),
        K: new Coordinate(0, -demiscale, distance),
        L: new Coordinate(distance, 0, demiscale)
    };
  }

  generateSolid(){
    const i = this.getIcosaedre();
    return {
      1: new OrigamiModule(i.A, i.B, i.C, i.G),
      2: new OrigamiModule(i.A, i.C, i.I, i.B),
      3: new OrigamiModule(i.B, i.C, i.A, i.H),
      4: new OrigamiModule(i.C, i.H, i.D, i.B),
      5: new OrigamiModule(i.B, i.H, i.C, i.F),
      6: new OrigamiModule(i.F, i.H, i.B, i.J),
      7: new OrigamiModule(i.B, i.F, i.H, i.G),
      8: new OrigamiModule(i.F, i.G, i.L, i.B),
      9: new OrigamiModule(i.B, i.G, i.F, i.A),
      10: new OrigamiModule(i.A, i.G, i.B, i.E),
      11: new OrigamiModule(i.E, i.G, i.A, i.L),
      12: new OrigamiModule(i.A, i.E, i.G, i.I),
      13: new OrigamiModule(i.A, i.I, i.E, i.C),
      14: new OrigamiModule(i.E, i.I, i.K, i.A),
      15: new OrigamiModule(i.C, i.I, i.A, i.D),
      16: new OrigamiModule(i.D, i.I, i.C, i.K),
      17: new OrigamiModule(i.C, i.D, i.I, i.H),
      18: new OrigamiModule(i.D, i.H, i.J, i.C),
      19: new OrigamiModule(i.D, i.J, i.K, i.H),
      20: new OrigamiModule(i.H, i.J, i.D, i.F),
      21: new OrigamiModule(i.F, i.J, i.H, i.L),
      22: new OrigamiModule(i.J, i.L, i.K, i.F),
      23: new OrigamiModule(i.F, i.L, i.J, i.G),
      24: new OrigamiModule(i.G, i.L, i.F, i.E),
      25: new OrigamiModule(i.E, i.L, i.G, i.K),
      26: new OrigamiModule(i.K, i.L, i.E, i.J),
      27: new OrigamiModule(i.E, i.K, i.L, i.I),
      28: new OrigamiModule(i.I, i.K, i.E, i.D),
      29: new OrigamiModule(i.J, i.K, i.D, i.L),
      30: new OrigamiModule(i.D, i.K, i.I, i.J),
    };
  }

  generateSVG(paths, solid: {}, solidSettingsService?, colorManagerService?){


    const insertWithZ = (objects: {d: string, stroke: string, stroke_width: number, fill: string, data_z: number}[]) => {
      for (const object of objects){
        let stop = true;
        let index = 0;
        while (stop){
          if (paths.length <= index || object.data_z >= paths[index].data_z){
            paths.splice(index, 0, object); // insert at good place

            stop = false;
          }
          index++;
        }
      }
    };

    const getCoord = (coordinate: Coordinate) => {
      const digits = Math.pow(10, 3);
      const project = (v) => {
        const f = (1000 / solidSettingsService.fov) /
                  (2000 / solidSettingsService.fov + coordinate.z) *
                  solidSettingsService.scale;
        return v * f;
      };
      const round = (v) => {
        return Math.round(v * digits) / digits;
      };
      return `${round(project(coordinate.x) + 250)} ${round(project(coordinate.y) + 250)}`;
    };

    paths = [];
    let i = 0;

    for (const s in solid) {
      if (solid.hasOwnProperty(s)) {
        const module = solid[s];
        const color = colorManagerService.showedColors[i++].color;
        insertWithZ([
          {
            d: `M${getCoord(module.ap)}L${getCoord(module.bp)}L${getCoord(module.cp)}L${getCoord(module.dp)}L${getCoord(module.an)}ZM${getCoord(module.ac)}L${getCoord(module.cp)}ZM${getCoord(module.cp)}L${getCoord(module.an)}Z`,
            stroke: '#000f',
            stroke_width: 0.4,
            fill: color,
            data_z: (module.cp).z,
          },
          {
            d: `M${getCoord(module.an)}L${getCoord(module.bn)}L${getCoord(module.cn)}L${getCoord(module.dn)}L${getCoord(module.ap)}ZM${getCoord(module.cn)}L${getCoord(module.ac)}ZM${getCoord(module.cn)}L${getCoord(module.ap)}Z`,
            stroke: '#000f',
            stroke_width: 0.4,
            fill: color,
            data_z: (module.cn).z,
          },
          {
            d: `M${getCoord(module.dp )}L${getCoord(module.gp )}L${getCoord(module.ip )}L${getCoord(module.hp )}L${getCoord(module.fp )}L${getCoord(module.ep)}L${getCoord(module.an)}ZM${getCoord(module.dp)}L${getCoord(module.hp)}Z`,
            stroke: '#000f',
            stroke_width: 0.4,
            fill: color,
            data_z: (module.fp).z,
          },
          {
            d: `M${getCoord(module.ap )}L${getCoord(module.dn )}L${getCoord(module.gn )}L${getCoord(module.in )}L${getCoord(module.hn )}L${getCoord(module.fn)}L${getCoord(module.en)}ZM${getCoord(module.dn)}L${getCoord(module.hn)}Z`,
            stroke: '#000f',
            stroke_width: 0.4,
            fill: color,
            data_z: (module.fn).z,
          },
          {
            d: `M${getCoord(module.ip )}L${getCoord(module.jp )}L${getCoord(module.hp )}Z`,
            stroke: '#000f',
            stroke_width: 0.4,
            fill: color,
            data_z: (module.kp).z,
          },
          {
            d: `M${getCoord(module.jn )}L${getCoord(module.in )}L${getCoord(module.hn )}Z`,
            stroke: '#000f',
            stroke_width: 0.4,
            fill: color,
            data_z: (module.kn).z,
          }
        ]);
      }
    }
    return paths;
  }
  generateCanvas(ctx, paths, solid: {}, solidSettingsService?, colorManagerService?){
    const getCoord = (coordinate: Coordinate) => {
      const digits = Math.pow(10, 3);
      const project = (v) => {
        const f = (1000 / solidSettingsService.fov) /
                  (2000 / solidSettingsService.fov + coordinate.z) *
                  (solidSettingsService.scale * solidSettingsService.definition / 500);
        return v * f;
      };
      const round = (v) => {
        return Math.round(v * digits) / digits;
      };
      return {
        x: round(project(coordinate.x) + (solidSettingsService.definition / 2)),
        y: round(project(coordinate.y) + (solidSettingsService.definition / 2))
      };
    };

    const list = [];
    const draw = (a, z) => {
      const o = {action: a, z};
      let stop = true;
      let index = 0;
      while (stop){
        if (list.length <= index || z >= list[index].z){
          list.splice(index, 0, o); // insert at good place
          stop = false;
        }
        index++;
      }
    };
    if (ctx !== undefined){
      ctx.clearRect(
        0,
        0,
        solidSettingsService.definition,
        solidSettingsService.definition
      );
    }
    paths = [];
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = solidSettingsService.definition / 300;
    let i = 0;
    for (const s in solid) {
      if (solid.hasOwnProperty(s)) {
        const module = solid[s];
        const color = colorManagerService.showedColors[i++].color;

        let c = {x: 0, y: 0};
        draw(() => {
          ctx.fillStyle = color;
          ctx.beginPath();
          c = getCoord(module.ac); ctx.lineTo(c.x, c.y);
          c = getCoord(module.ap); ctx.lineTo(c.x, c.y);
          c = getCoord(module.bp); ctx.lineTo(c.x, c.y);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
          ctx.beginPath();
          c = getCoord(module.an); ctx.lineTo(c.x, c.y);
          c = getCoord(module.cp); ctx.lineTo(c.x, c.y);
          c = getCoord(module.ac); ctx.lineTo(c.x, c.y);
          c = getCoord(module.an); ctx.lineTo(c.x, c.y);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
          ctx.beginPath();
          c = getCoord(module.an); ctx.lineTo(c.x, c.y);
          c = getCoord(module.dp); ctx.lineTo(c.x, c.y);
          c = getCoord(module.cp); ctx.lineTo(c.x, c.y);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
        }, (module.cp).z);
        draw(() => {
          ctx.fillStyle = color;
          ctx.beginPath();
          // m r b
          c = getCoord(module.ac); ctx.lineTo(c.x, c.y);
          c = getCoord(module.an); ctx.lineTo(c.x, c.y);
          c = getCoord(module.bn); ctx.lineTo(c.x, c.y);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
          ctx.beginPath();
          // c m v c
          c = getCoord(module.ap); ctx.lineTo(c.x, c.y);
          c = getCoord(module.ac); ctx.lineTo(c.x, c.y);
          c = getCoord(module.cn); ctx.lineTo(c.x, c.y);
          c = getCoord(module.ap); ctx.lineTo(c.x, c.y);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
          ctx.beginPath();
          // c j v
          c = getCoord(module.ap); ctx.lineTo(c.x, c.y);
          c = getCoord(module.dn); ctx.lineTo(c.x, c.y);
          c = getCoord(module.cn); ctx.lineTo(c.x, c.y);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
        }, (module.cn).z);
        draw(() => {
          ctx.fillStyle = color;
          ctx.beginPath();
          c = getCoord(module.hp); ctx.lineTo(c.x, c.y);
          c = getCoord(module.fp); ctx.lineTo(c.x, c.y);
          c = getCoord(module.ep); ctx.lineTo(c.x, c.y);
          c = getCoord(module.an); ctx.lineTo(c.x, c.y);
          c = getCoord(module.dp); ctx.lineTo(c.x, c.y);
          c = getCoord(module.gp); ctx.lineTo(c.x, c.y);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
          ctx.beginPath();
          c = getCoord(module.hp); ctx.lineTo(c.x, c.y);
          c = getCoord(module.gp); ctx.lineTo(c.x, c.y);
          c = getCoord(module.ip); ctx.lineTo(c.x, c.y);
          c = getCoord(module.hp); ctx.lineTo(c.x, c.y);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();


        }, (module.fp).z);
        draw(() => {
          ctx.fillStyle = color;
          ctx.beginPath();
          c = getCoord(module.gn); ctx.lineTo(c.x, c.y);
          c = getCoord(module.dn); ctx.lineTo(c.x, c.y);
          c = getCoord(module.ap); ctx.lineTo(c.x, c.y);
          c = getCoord(module.en); ctx.lineTo(c.x, c.y);
          c = getCoord(module.fn); ctx.lineTo(c.x, c.y);
          c = getCoord(module.hn); ctx.lineTo(c.x, c.y);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
          ctx.beginPath();
          c = getCoord(module.gn); ctx.lineTo(c.x, c.y);
          c = getCoord(module.in); ctx.lineTo(c.x, c.y);
          c = getCoord(module.hn); ctx.lineTo(c.x, c.y);
          c = getCoord(module.gn); ctx.lineTo(c.x, c.y);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
        }, (module.fn).z);
        draw(() => {
          ctx.fillStyle = color;
          ctx.beginPath();
          c = getCoord(module.ip); ctx.moveTo(c.x, c.y);
          c = getCoord(module.jp); ctx.lineTo(c.x, c.y);
          c = getCoord(module.hp); ctx.lineTo(c.x, c.y);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
        }, (module.kp).z);
        draw(() => {
          ctx.fillStyle = color;
          ctx.beginPath();
          c = getCoord(module.jn); ctx.moveTo(c.x, c.y);
          c = getCoord(module.in); ctx.lineTo(c.x, c.y);
          c = getCoord(module.hn); ctx.lineTo(c.x, c.y);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
        }, (module.kn).z);
      }
    }
    for (const action of list){
      action.action();
    }
  }
}
