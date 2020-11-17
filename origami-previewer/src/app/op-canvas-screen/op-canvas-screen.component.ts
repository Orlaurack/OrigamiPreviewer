import { Component, ElementRef, Input, OnInit, ViewChild  } from '@angular/core';
import { SolidStarService } from '../op-solid-star.service';
import { RotationService } from '../op-rotation.service';
import { ColorManagerService } from '../op-color-manager.service';
import { SolidSettingsService } from '../op-solid-settings.service';
import { SolidModuleService } from '../op-solid-module.service';
import { Steps } from '../steps';


@Component({
  selector: 'app-op-canvas-screen',
  templateUrl: './op-canvas-screen.component.html',
  styleUrls: ['./op-canvas-screen.component.scss']
})


export class OpCanvasScreenComponent implements OnInit {

  shadow: string;
  rotation: RotationService;
  intervalAutoRotation: any;
  solidStarService: SolidStarService;
  solid: {};
  paths: {d: string, stroke: string, stroke_width: number, fill: string, data_z: number}[] = [];
  mouseDowned = false;
  mouse: {x, y} = {x: 3, y: 0};
  touchMem: {x, y};
  touchMemLastMove: {x, y};
  inertia = 0.96;
  firstLearn = true;
  readonly second: number;

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;

  @Input() mode: string;
  @Input() colorManagerService: ColorManagerService;
  @Input() solidSettingsService: SolidSettingsService;
  @Input() solidModuleService: SolidModuleService;

  constructor(colorManagerService: ColorManagerService, solidSettingsService: SolidSettingsService) {
    this.colorManagerService = colorManagerService;
    this.solidSettingsService = solidSettingsService;
    this.solidStarService = new SolidStarService(solidSettingsService);
    this.solid = this.solidStarService.generateSolid();
    this.paths = [];
    this.second = 1000;
    this.mode = 'preview';
   }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.rotation = new RotationService(this.solidSettingsService);
    this.intervalAutoRotation = setInterval(() => {

      if (this.mouseDowned){
        this.mouse.x *= 0.3;
        this.mouse.y *= 0.3;
      }else{
        this.mouse.x += this.solidSettingsService.rotation.x;
        this.mouse.y += this.solidSettingsService.rotation.y;
      }

      if (this.mode === 'learn'){
      if (!this.solidModuleService.controls.paused){
        if (this.solidModuleService.controls.completion === 100){
          if (this.solidModuleService.controls.auto_play){
            this.solidModuleService.next();
            this.solidModuleService.controls.completion = 0;
          }else{
            this.solidModuleService.controls.paused = true;
          }
        }

        const markingFold = new Steps().steps[this.solidModuleService.index]['marking-fold'];

        this.solidModuleService.controls.completion += this.solidModuleService.controls.speed / (markingFold ? 4.4 : 2);
        if (this.solidModuleService.controls.completion >= 100) {
          this.solidModuleService.controls.completion = 100;
        }
      }


      this.solidModuleService.generateCanvas(this.ctx, this.solidModuleService.generateFinalSolid(), this.solidSettingsService, this.colorManagerService);

      }else if (this.mode === 'preview'){
        this.solid = this.rotation.rotatePoints(this.solid, this.mouse);
        this.solidStarService.generateCanvas(this.ctx, this.paths, this.solid, this.solidSettingsService, this.colorManagerService);
      }

    }, this.second / this.solidSettingsService.fps);
  }

  mouseDown(){
    this.mouseDowned = true;
  }

  mouseMove(e){
    if (this.mouseDowned){
      this.mouse = {x: this.mouse.x + (e.movementX * 3), y: this.mouse.y + (e.movementY * 3)};
    }
  }

  touchStart(e){
    this.touchMem = {x: e.touches[0].clientX, y: e.touches[0].clientY};
    this.mouseDowned = true;
  }
  touchMove(e){
    if (this.mouseDowned){
      this.touchMemLastMove = {x: 5 * (e.touches[0].clientX - this.touchMem.x), y: 5 * (e.touches[0].clientY - this.touchMem.y)};
      this.touchMem = {x: e.touches[0].clientX, y: e.touches[0].clientY};
      this.mouse = this.touchMemLastMove;
    }
  }
  touchEnd(e){
    this.mouseDowned = false;

  }

  mouseUp(e){
    this.mouseDowned = false;
  }

  changeScreenType(to){
    this.mode = to;
    if (to === 'preview'){
      this.solid = this.solidStarService.generateSolid();
    }else if (to === 'learn'){
      if (this.firstLearn){
        this.firstLearn = false;
        this.mouse.y = 3;
        this.mouse.x = 0;
      }
    }
  }
}
