import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild  } from '@angular/core';
import { ScreenService } from '../op-screen.service';
import { ColorManagerService } from '../op-color-manager.service';
import { SolidSettingsService } from '../op-solid-settings.service';
import { SolidModuleService } from '../op-solid-module.service';
import { RotationService } from '../op-rotation.service';
import { SolidStarService } from '../op-solid-star.service';


@Component({
  selector: 'app-op-canvas-screen',
  templateUrl: './op-canvas-screen.component.html',
  styleUrls: ['./op-canvas-screen.component.scss']
})

export class OpCanvasScreenComponent implements OnInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;

  @Input() mode: string;
  @Input() screenService: ScreenService;
  @Input() colorManagerService: ColorManagerService;
  @Input() solidSettingsService: SolidSettingsService;
  @Input() solidModuleService: SolidModuleService;
  @Input() updatedSolid: number;
  @Input() page: string;
  rotationService: RotationService;
  solidStarService: SolidStarService;

  constructor(colorManagerService: ColorManagerService, solidSettingsService: SolidSettingsService, solidModuleService: SolidModuleService, screenService: ScreenService) {
    this.colorManagerService = colorManagerService;
    this.solidSettingsService = solidSettingsService;
    this.solidModuleService = solidModuleService;
    this.screenService = screenService;
    this.solidStarService = new SolidStarService(this.solidSettingsService);
    this.rotationService =  new RotationService(this.solidSettingsService);
    //this.paths = [];
    //this.updateSolid();
  }

  ngOnInit(): void {    
  }
  
  ngAfterViewInit(){
    this.ctx = this.canvas.nativeElement.getContext('2d');
    
    this.screenService.init(
      this.rotationService,
      this.solidStarService,
      this.solidSettingsService,
      this.colorManagerService,
      this.solidModuleService,
      this.ctx
    )
    
    this.screenService.play();
  }

  touchStart(e) {
    this.screenService.touchMem = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    this.screenService.mouseDowned = true;
  }
  touchMove(e) {
    if (this.screenService.mouseDowned) {
      this.screenService.touchMemLastMove = { x: 5 * (e.touches[0].clientX - this.screenService.touchMem.x), y: 5 * (e.touches[0].clientY - this.screenService.touchMem.y) };
      this.screenService.touchMem = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      this.screenService.mouse = this.screenService.touchMemLastMove;
    }
  }
  touchEnd(e) {
    this.screenService.mouseDowned = false;
  }

  mouseUp(e) {
    this.screenService.mouseDowned = false;
  }
  mouseDown() {
    this.screenService.mouseDowned = true;
  }

  mouseMove(e) {
    if (this.screenService.mouseDowned) {
      this.screenService.mouse = { x: this.screenService.mouse.x + (e.movementX * 3), y: this.screenService.mouse.y + (e.movementY * 3) };
    }
  } 

  ngOnChanges(changes: SimpleChanges) {
    if(this.screenService){
      this.screenService.ngOnChanges(changes);
    }
  }

  getDef() {
    return this.solidSettingsService.definition;
  }
}
