import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { Coordinate } from 'src/app/op-coordinate';
import { OpIcosaedre120Service } from './op-icosaedre-120.service';
import { OpIcosaedre270Service } from './op-icosaedre-270.service';
import { OpIcosaedreService } from './op-icosaedre.service';
import { OpOctaedreService } from './op-octoadre.service';
import { SolidSettingsService } from './op-solid-settings.service';
import { OpTetraedreService } from './op-tetraedre.service';

@Injectable()
export class SolidStarService {

  readonly size: number;
  solidSettingsService: SolidSettingsService;
  solidService: OpIcosaedreService | OpIcosaedre120Service | OpIcosaedre270Service;

  constructor(solidSettingsService: SolidSettingsService) {
    this.solidSettingsService = solidSettingsService;
    this.size = 1;
    this.updateSolid(this.solidSettingsService.solidService);
  }

  generateSolid(picHeight: number) {
    return this.solidService.getIcosaedre(this.size, picHeight);
  }

  generateSVG(paths, solid: {}, solidSettingsService?, colorManagerService?) {


    const insertWithZ = (objects: {d: string, stroke: string, stroke_width: number, fill: string, data_z: number}[]) => {
      for (const object of objects) {
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
  generateCanvas(ctx, paths, solid: any[], solidSettingsService?, colorManagerService?, test?:boolean, gifMode=false){
    if(gifMode){
      ctx = document.createElement("canvas").getContext('2d');
      ctx.canvas.width = solidSettingsService.definition;
      ctx.canvas.height = solidSettingsService.definition;
    }
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
    
    const repetition = 1;
    if (test){
      let to_color = (c, max)=> (Math.round(Math.max(0, Math.min(1,(c+170)/340))*max));
      colorManagerService.storedColors = [];
      // console.log('test')

      for(let color of solid.map(c => 'rgb('+ to_color(c.ac.x, 256)+','+to_color(c.ac.y, 256)+','+to_color(c.ac.z, 256)+')')){
        colorManagerService.storedColors.push({color:color});
      }
      // console.log(solid.map(c => '#'+ to_color(c.ac.x)+to_color(c.ac.y)+to_color(c.ac.z)));
      colorManagerService.update();


    }
    for (const s in solid) {
      if (solid.hasOwnProperty(s)) {
        const module = solid[s];
        let color = '';
        color = colorManagerService.showedColors[Math.floor((i++) / repetition)].color;


        let c = {x: 0, y: 0};
        draw(() => {
          ctx.fillStyle = color;
          ctx.lineCap = 'butt';
          ctx.lineJoin = 'bevel';
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
          ctx.lineCap = 'butt';
          ctx.lineJoin = 'bevel';
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
          ctx.lineCap = 'butt';
          ctx.lineJoin = 'bevel';
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
          ctx.lineCap = 'butt';
          ctx.lineJoin = 'bevel';
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
          ctx.lineCap = 'butt';
          ctx.lineJoin = 'bevel';
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
          ctx.lineCap = 'butt';
          ctx.lineJoin = 'bevel';
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
    if (gifMode){
      return ctx;
    }
  }

  updateSolid(solidService: string) {
    switch (solidService) {
      case 'tetraedre':
        this.solidService = new OpTetraedreService(this.solidSettingsService);
        break;
      case 'octaedre':
        this.solidService = new OpOctaedreService(this.solidSettingsService);
        break;
      case 'icosaedre':
        this.solidService = new OpIcosaedreService(this.solidSettingsService);
        break;
      case 'icosaedre120':
        this.solidService = new OpIcosaedre120Service(this.solidSettingsService);
        break;
      case 'icosaedre270':
        this.solidService = new OpIcosaedre270Service(this.solidSettingsService);
        break;
      default:
        this.solidService = new OpIcosaedreService(this.solidSettingsService);
        break;
    }
    this.generateSolid(this.solidSettingsService.picHeight);
  }
}
