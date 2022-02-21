import { Injectable, Input, Output, OnInit, SimpleChanges, ElementRef, SimpleChange } from '@angular/core';
import { SolidStarService } from './op-solid-star.service';
import { RotationService } from './op-rotation.service';
import { ColorManagerService } from './op-color-manager.service';
import { SolidSettingsService } from './op-solid-settings.service';
import { SolidModuleService } from './op-solid-module.service';
import { Steps } from './steps';

@Injectable({
  providedIn: 'root'
})

export class ScreenService {

  shadow: string;
  intervalAutoRotation: any;
  solid: any[];
  paths: { d: string, stroke: string, stroke_width: number, fill: string, data_z: number }[] = [];
  mouseDowned = false;
  mouse: { x, y } = { x: 3, y: 0 };
  touchMem: { x, y };
  touchMemLastMove: { x, y };
  inertia = 0.96;
  firstLearn = true;
  readonly second: number;
  moduleNumber: number;
  firstLoop = true;
  rotation: RotationService;
  solidStarService: SolidStarService;
  solidSettingsService: SolidSettingsService;
  colorManagerService:ColorManagerService;
  solidModuleService:SolidModuleService;
  mode:string;
  ctx: CanvasRenderingContext2D;
  test: any;

  constructor(){
    this.second = 1000;
    this.mode = 'preview';
  }
    
  
  init(
    rotationService: RotationService,
    solidStarService: SolidStarService,
    solidSettingsService: SolidSettingsService,
    colorManagerService: ColorManagerService,
    solidModuleService: SolidModuleService,
    ctx: CanvasRenderingContext2D
  ) {
    this.rotation = rotationService;
    this.solidStarService = solidStarService;
    this.solidSettingsService = solidSettingsService;
    this.colorManagerService = colorManagerService;
    this.solidModuleService = solidModuleService;
    this.ctx = ctx;
    this.updateSolid();

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.updatedSolid !== undefined && this.solidStarService && this.solidSettingsService) {
      this.solidStarService.updateSolid(this.solidSettingsService.solidService);
      this.updateSolid();
    }
  }
  
  pause(){
    this.solidSettingsService.play = false;
  }
    
  play() {
    this.solidSettingsService.play = true;
    this.intervalAutoRotation = setInterval(() => {
      if (this.mouseDowned) {
        this.mouse.x *= 0.3;
        this.mouse.y *= 0.3;
      } else {
        this.mouse.x += this.solidSettingsService.rotation.x;
        this.mouse.y += this.solidSettingsService.rotation.y;
      }

      if (this.mode === 'learn') {
        if (!this.solidModuleService.controls.paused) {
          if (this.solidModuleService.controls.completion === 100) {
            if (this.solidModuleService.controls.auto_play) {
              this.solidModuleService.next();
              this.solidModuleService.controls.completion = 0;
            } else {
              this.solidModuleService.controls.paused = true;
            }
          }

          const markingFold = new Steps().steps[this.solidModuleService.index]['marking-fold'];

          this.solidModuleService.controls.completion += this.solidModuleService.controls.speed / (markingFold ? 4.4 : 2);
          if (this.solidModuleService.controls.completion >= 100) {
            this.solidModuleService.controls.completion = 100;
          }
        }

        this.solidModuleService.generateCanvas(
          this.ctx,
          this.solidModuleService.generateFinalSolid(),
          this.solidSettingsService,
          this.colorManagerService
        );

      } else if (this.mode === 'preview') {
        if (this.firstLoop) {
          this.firstLoop = false;
          this.solid = this.rotation.rotatePoints(this.solid, { x: 0, y: 0 });//Math.random()*720, y:Math.random()*720});

          //this.firstPos = Math.round(this.solid[0].ac.z * 10);
          //console.log(this.solid[0].ac.z+'->'+this.firstPos);
          //this.ddd = new Date().getTime();
        }
        else {
          this.generate()
          if (this.solidSettingsService.inertia == 1) {
            this.solidSettingsService.rotation.x = 0;
            this.solidSettingsService.rotation.y = 0;
          }
          /*if (Math.round(this.solid[0].ac.z * 10) <= -1617) {
            if (!this.last) {
              this.last = true
              //console.log(this.solid[0].ac.z*10);
              this.array.push(new Date().getTime() - this.ddd);
              function numAverage(a) {
                var b = a.length,
                  c = 0, i;
                for (i = 0; i < b; i++) {
                  c += Number(a[i]);
                }
                return c / b;
              }
              this.ddd = new Date().getTime();
              //console.log(numAverage(this.array));
            }
          } else {
            this.last = false
          }*/
        }
      }
      if (!this.solidSettingsService.play) {
        clearInterval(this.intervalAutoRotation);
      }
    }, this.second / this.solidSettingsService.fps);
  }
  
  generate(coordinates = this.mouse, gifMode = false) {
    this.solid = this.rotation.rotatePoints(this.solid, coordinates);
    const ctx = this.solidStarService.generateCanvas(this.ctx, this.paths, this.solid, this.solidSettingsService, this.colorManagerService, this.test, gifMode);
    
    if(gifMode){
      return ctx
    }
  }

  changeScreenType(to) {
    this.mode = to;
    if (to === 'preview') {
      this.updateSolid();
    } else if (to === 'learn') {
      if (this.firstLearn) {
        this.firstLearn = false;
        this.mouse.y = 3;
        this.mouse.x = 0;
      }
    }
  }

  updateSolid() {
    this.solidStarService.updateSolid(this.solidSettingsService.solidService);
    this.solid = this.solidStarService.generateSolid(this.solidSettingsService.picHeight);
    this.moduleNumber = this.solid.length;
  }

}
