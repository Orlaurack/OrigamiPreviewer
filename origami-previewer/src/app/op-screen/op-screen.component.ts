import { Component, Input, OnInit } from '@angular/core';
import { ColorManagerService } from '../op-color-manager.service';
import { RotationService } from '../op-rotation.service';
import { SolidModuleService } from '../op-solid-module.service';
import { SolidSettingsService } from '../op-solid-settings.service';
import { SolidStarService } from '../op-solid-star.service';

@Component({
  selector: 'app-op-screen',
  templateUrl: './op-screen.component.html',
  styleUrls: ['./op-screen.component.scss']
})
export class OpScreenComponent implements OnInit {

  svg: string;
  shadow: string;
  rotation: RotationService;
  intervalAutoRotation: any;
  solidStarService: SolidStarService;
  solid: any[];
  paths: {d: string, stroke: string, stroke_width: number, fill: string, data_z: number}[] = [];
  mouseDowned = false;
  mouse: {x, y} = {x: 3, y: 0};
  touchMem: {x, y};
  touchMemLastMove: {x, y};
  inertia = 0.96;
  firstLearn = true;
  readonly second: number;

  @Input() mode: string;
  @Input() colorManagerService: ColorManagerService;
  @Input() solidSettingsService: SolidSettingsService;
  @Input() solidModuleService: SolidModuleService;


  constructor(colorManagerService: ColorManagerService, solidSettingsService: SolidSettingsService) {
    this.colorManagerService = colorManagerService;
    this.solidSettingsService = solidSettingsService;
    this.solidStarService = new SolidStarService(this.solidSettingsService);
    this.solid = this.solidStarService.generateSolid(100);
    this.paths = [];
    this.second = 1000;
    this.mode = 'preview';
   }

  ngOnInit(): void {
    this.rotation = new RotationService(this.solidSettingsService);
    this.intervalAutoRotation = setInterval(() => {
      if (this.mouseDowned) {
        this.mouse.x *= 0.3;
        this.mouse.y *= 0.3;
      } else {
        this.mouse.x += this.solidSettingsService.rotation.x;
        this.mouse.y += this.solidSettingsService.rotation.y;
      }
      if (this.mode === 'learn') {
        /*if (!this.solidModuleService.controls.paused){
          if (this.solidModuleService.controls.completion === 100){
            this.solidModuleService.controls.completion = 0;
          }


          const markingFold = new steps().steps[this.solidModuleService.index]['marking-fold'];
          this.solidModuleService.controls.completion +=
            this.solidModuleService.controls.speed /
            (markingFold ? 10.4 : 5);
          if (this.solidModuleService.controls.completion >= 100) {
            this.solidModuleService.controls.completion = 100;
          }
        }
        const finalSolid = this.solidModuleService.generateFinalSolid();
        */
      } else if (this.mode === 'preview') {
        //this.solid = this.rotation.rotatePoints(this.solid, this.mouse);
        //this.paths = this.solidStarService.generateSVG(this.paths, this.solid, this.solidSettingsService, this.colorManagerService);
      }

    }, this.second / this.solidSettingsService.fps);
  }

  mouseDown() {
    this.mouseDowned = true;
  }

  mouseMove(e) {
    if (this.mouseDowned) {
      this.mouse = {x: this.mouse.x + e.movementX, y: this.mouse.y + e.movementY};
    }
  }

  touchStart(e) {
    this.touchMem = {x: e.touches[0].clientX, y: e.touches[0].clientY};
    this.mouseDowned = true;
  }
  touchMove(e) {
    if (this.mouseDowned) {
      this.touchMemLastMove = {x: 5 * (e.touches[0].clientX - this.touchMem.x), y: 5 * (e.touches[0].clientY - this.touchMem.y)};
      this.touchMem = {x: e.touches[0].clientX, y: e.touches[0].clientY};
      this.mouse = this.touchMemLastMove;
    }
  }
  touchEnd(e) {
    this.mouseDowned = false;

  }

  mouseUp(e) {
    this.mouseDowned = false;
  }

  changeScreenType(to) {
    this.mode = to;
    if (to === 'preview') {
      this.solid = this.solidStarService.generateSolid(100);
    } else if (to === 'learn') {
      if (this.firstLearn) {
        this.firstLearn = false;
        this.mouse.y = 3;
        this.mouse.x = 0;
      }
    }
  }
}
