import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Injectable } from '@angular/core';
import { RotationService } from './op-rotation.service';
import { Steps, Step } from './steps';

@Injectable({
  providedIn: 'root'
})
export class SolidModuleService {
  index: number;
  controls: { paused: boolean, speed: number, completion: number, auto_play: boolean };
  rotationService: RotationService;
  turned = false;
  maxIndex = new Steps().steps.length;
  solid: Step;


  constructor() {
    this.index = 0;
    this.controls = { paused: true, speed: 1, completion: 0, auto_play: true };
  }

  next(){
    this.index++;
    if (this.index >= this.maxIndex){
      this.index = 0;
    }
  }
  previous(){
    this.index--;
    if (this.index < 0){
      this.index = this.maxIndex - 1;
    }
  }

  generateFinalSolid(): {} {
    this.solid = new Steps().steps[this.index];
    const coords = this.solid.shapes;
    let back = false;
    if (this.solid.rotation){
      for (const s in this.solid.shapes) {
        if (s in this.solid.shapes){
          for (const c in this.solid.shapes[s].coords){
            if (this.solid.shapes[s].coords[c].x < 0){
              this.solid.shapes[s].coords[c] = this.rotatePointArroundCenter(
                this.solid.shapes[s].coords[c],
                {
                  a: { x: 0, y: -1 },
                  b: { x: 0, y: 1}
                },
                this.controls.completion
              );
            }else if (this.solid.shapes[s].coords[c].x > 0){
              this.solid.shapes[s].coords[c] = this.rotatePointArroundCenter(
                this.solid.shapes[s].coords[c],
                {
                  a: { x: 0, y: -1 },
                  b: { x: 0, y: 1}
                },
                this.controls.completion,
                true
              );
            }
          }
        }
      }
    }else{
      for (const index of this.solid['move-index']){
        const fi = this.solid['fold-index'];
        if (this.solid['marking-fold']){
          let completion = this.controls.completion;
          if (completion > 45){
            if (completion < 55){
              completion = 100;
            }else{

              completion = (100 - completion) * 2.2;
            }
          }else{
            completion *= 2.2;
          }
          if (completion >= 50){
            back = true;
          }
          this.solid.shapes[index[0]].coords[index[1]] = this.rotatePointArroundCenter(
            coords[index[0]].coords[index[1]],
            {
              a: coords[fi[0][0]].coords[fi[0][1]],
              b: coords[fi[1][0]].coords[fi[1][1]]
            },
            completion
          );
        }else{
          this.solid.shapes[index[0]].coords[index[1]] = this.rotatePointArroundCenter(
            coords[index[0]].coords[index[1]],
            {
              a: coords[fi[0][0]].coords[fi[0][1]],
              b: coords[fi[1][0]].coords[fi[1][1]]
            },
            this.controls.completion
          );
        }
      }
    }
    if (this.controls.completion >= 50){
      back = true;
    }
    if (this.controls.completion === 100){
      console.log(this.solid);
    }
    this.solid.back = back;
    return this.solid;
  }

  rotatePointArroundCenter(
    point: {x: number, y: number},
    rotationAxe: {
      a: {x: number, y: number},
      b: {x: number, y: number}
    },
    ratio: number,
    invertedRotation: boolean= false
  ){
    const A = rotationAxe.a;
    const B = rotationAxe.b;
    const getCenter = (A, B, C) => {
      const x1 = A.x;
      const y1 = A.y;
      const x2 = B.x;
      const y2 = B.y;
      const x3 = C.x;
      const y3 = C.y;
      const px = x2 - x1;
      const py = y2 - y1;
      const dAB = px * px + py * py;
      const u = ((x3 - x1) * px + (y3 - y1) * py) / dAB;
      return {x: x1 + u * px, y: y1 + u * py};
    };
    const center = getCenter(A, B, point);
    const d  = Math.abs(Math.sqrt(Math.pow(center.x - point.x, 2) + Math.pow(center.y - point.y, 2)));
    const cos = Math.cos(ratio / 100 * Math.PI);
    const sin = Math.sin(ratio / 100 * Math.PI);

    this.turned = ratio >= 50;
    let a = {x: point.x - center.x, y: point.y - center.y, z: 0};
    a.x *= cos;
    a.y *= cos;
    a.z = -sin;

    a.x += center.x;
    a.y += center.y;
    a.z *= (d / 2);

    if (invertedRotation){
      a.z = -a.z;
    }


    // const ry = 20;

    // const sinAngley = Math.sin(ry);
    // const cosAngley = Math.cos(ry);
    // p.x += sinAngley;
    // p.y -= cosAngley;
    // p.z;
    return a;
   }

/* generateSVG(paths, solid: any, solidSettingsService, colorManagerService) {
    const insertWithZ = (objects: { d: string, stroke: string, stroke_width: number, fill: string, data_z: number }[]) => {
      for (const object of objects) {
        let stop = true;
        let index = 0;
        while (stop) {
          if (paths.length <= index || object.data_z >= paths[index].data_z) {
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
      return `${round(project(coordinate.x * 10) + 250)} ${round(project(coordinate.y * 10) + 250)}`;
    };

    paths = [];

    const color = colorManagerService.showedColors[0].color;
    const zStatic = 0; //solid.staticSheet.map(
     // (v) => v.z).reduce(
     //   (accumulator, currentValue) => accumulator + currentValue
      //) / solid.staticSheet.length;
    const zAnimate = 0; //solid.animedSheet.map(
      //(v) => v.z).reduce(
      //  (accumulator, currentValue) => accumulator + currentValue
      //) / solid.animedSheet.length;

    const getBack = (vertices) => {
      let area = 0;
      for (let i = 0; i < vertices.length; i++) {
        const j = (i + 1) % vertices.length;
        area += vertices[i].x * vertices[j].y;
        area -= vertices[j].x * vertices[i].y;
      }
      return (area / 2) > 0;
    };
    let staticD = 'M';
    for (const sheet in solid.staticSheet) {
      if (sheet in solid.staticSheet) {
        staticD += getCoord(solid.staticSheet[sheet]);
      }
    }
    staticD = staticD.slice(0, -1) + 'Z';
    let animatedD = 'M';
    for (const sheet in solid.animatedSheet) {
      if (sheet in solid.animatedSheet) {
        animatedD += getCoord(solid.animatedSheet[sheet]);
      }
    }
    animatedD = animatedD.slice(0, -1) + 'Z';
    insertWithZ([
      {
        d: staticD,
        stroke: '#000f',
        stroke_width: 0.8,
        fill: getBack(solid.staticSheet) ? color : '#ffffff',
        data_z: zStatic,
      },
      {
        d: animatedD,
        stroke: '#000f',
        stroke_width: 0.8,
        fill: getBack(solid.animedSheet) ? color : '#ffffff',
        data_z: zAnimate,
      }
    ]);

    return paths;
  }*/
  generateCanvas(ctx, solid, solidSettingsService, colorManagerService) {
    const back = solid.back;

    solidSettingsService.definition = 600;
    solidSettingsService.screenHeight = 300;
    let c;
    ctx.clearRect(
      0,
      0,
      solidSettingsService.definition,
      solidSettingsService.definition
    );
    const getCoord = (coordinate: {x: number, y: number, z: number}) => {
      if (coordinate.z === undefined){coordinate.z = 0; }
      const digits = Math.pow(10, 3);
      const project = (v) => {
        const f = (1000 / solidSettingsService.fov) /
                  (2000 / solidSettingsService.fov + (coordinate.z * 300)) *
                  (solidSettingsService.scale * solidSettingsService.definition / 500);
        return v * f;
      };
      const round = (v) => {
        return Math.round(v * digits) / digits;
      };
      return {
        x: round(project(coordinate.x * 300) + (solidSettingsService.definition / 2)),
        y: round(project(coordinate.y * 300) + (solidSettingsService.definition / 2))
      };
    };

    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#202020';

    const drawShape = (shape, front) => {
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.fillStyle = front ? colorManagerService.inputColors[0].color : '#D8D8D8';
      ctx.setLineDash([]);
      for (const coord of shape.coords){
        c = getCoord(coord); ctx.lineTo(c.x, c.y);
      }
      c = getCoord(shape.coords[0]); ctx.lineTo(c.x, c.y);

      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    };

    let sortedArray = [];
    for(const index in solid.shapes){
      let i = 0;
      for (const a of sortedArray){
        if(this.turned?a['z-index']>solid.shapes[index]['z-index']:a['z-index']<solid.shapes[index]['z-index']){
          i++;
        }
      }
      sortedArray.splice(i, 0, solid.shapes[index]);
    }

    for (const shape of sortedArray){
      drawShape(shape, shape['front-face']);
    }


    ctx.strokeStyle = '#404040';
    ctx.lineWidth = 2;
    if (solid['fold-index'].length > 0){
      ctx.setLineDash(solid['v-fold'] ? [30, 10] : [30, 10, 10, 10]);
      const fi = solid['fold-index'];
      c = getCoord(solid.shapes[fi[0][0]].coords[fi[0][1]]); ctx.moveTo(c.x, c.y);
      c = getCoord(solid.shapes[fi[1][0]].coords[fi[1][1]]); ctx.lineTo(c.x, c.y);
      ctx.stroke();
      ctx.closePath();
    }
    if (solid['lasts-fold'].length > 0){
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.lineWidth = 2;
      let draw = false;
      for (const index of solid['lasts-fold']){
        c = getCoord(solid.shapes[index[0]].coords[index[1]]);
        if (draw){
          ctx.lineTo(c.x, c.y);
        }else{
          ctx.moveTo(c.x, c.y);
        }
        draw = !draw;
      }
      ctx.stroke();
      ctx.closePath();
    }

  }
}
/*
class Step {
  staticSheet: Coordinate[];
  animateSheet: Coordinate[];
  animedSheet: Coordinate[];
  rotationAxeCoordinatesIndexs: {a: number, b: number};
  animateCoordinatesIndexs: number[];
  redo: boolean;

  constructor(
  staticSheet: Coordinate[],
  animateSheet: Coordinate[],
  rotationAxeCoordinatesIndexs: {a: number, b: number},
  animateCoordinatesIndexs: number[],
  redo: boolean)
  {
  this.staticSheet = staticSheet;
  this.animateSheet = animateSheet;
  this.animedSheet = [];
  for (const c of this.animateSheet){
    this.animedSheet.push(new Coordinate(c.x, c.y, c.z));
  }
  this.rotationAxeCoordinatesIndexs = rotationAxeCoordinatesIndexs;
  this.animateCoordinatesIndexs = animateCoordinatesIndexs;
  this.redo = redo;
  }
}*/
