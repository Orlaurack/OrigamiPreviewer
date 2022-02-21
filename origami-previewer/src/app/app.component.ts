import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ColorManagerService } from './op-color-manager.service';
import { RotationService } from './op-rotation.service';
import { ScreenService } from './op-screen.service';
import { SolidModuleService } from './op-solid-module.service';
import { SolidSettingsService } from './op-solid-settings.service';
import { SolidStarService } from './op-solid-star.service';
import { OpUrlManagerService } from './op-url-manager.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  @ViewChild('canvas_screen') canvas_screen: ElementRef;
  onlyScreen = true;
  title = 'angular-origami-previewer';
  mouseEvent: any;
  storedColors: {color: string}[] = [];
  showedColors: {color: string}[] = [];
  initialColors: {color: string}[] = [];
  colorManagerService: ColorManagerService;
  solidSettingsService: SolidSettingsService;
  solidModuleService: SolidModuleService;
  urlManagerService: OpUrlManagerService;
  screenService: ScreenService;
  gradientGenerator: any = { visible: false };
  isMobileBrowser: boolean;
  svgMode: boolean;
  mode: string;
  a: string;
  updatedSolid = 0;
  page: string;
  ctx: CanvasRenderingContext2D
  @Output() mouseMove = new EventEmitter<any>();
  ngOnInit() {
    if(window.location.href.includes('screen')){
      this.page = 'onlyScreen';
      this.solidSettingsService.play=true;
    }else if(window.location.href.includes('image')){
      this.page = 'image';
    }else{
      this.page = 'default'
      this.solidSettingsService.play=true;
    }
    
    
  }
  constructor() {
    this.screenService = new ScreenService();      
    this.isMobileBrowser = new RegExp('Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS')
      .test(navigator.userAgent);
    this.isMobileBrowser = true;
    if (this.isMobileBrowser) {
      this.svgMode = false;
    } else {
      this.svgMode = true;
    }
    
    this.mode = 'preview';
    this.solidModuleService = new SolidModuleService();
    this.solidSettingsService = new SolidSettingsService();
    this.colorManagerService = new ColorManagerService();
    this.urlManagerService = new OpUrlManagerService(this.colorManagerService);
    this.ctx = null
    this.storedColors = this.colorManagerService.storedColors;
    this.showedColors = this.colorManagerService.showedColors;
  }

  onMouseMove(event) {
    this.mouseEvent = event;
    this.mouseMove.emit(this.mouseEvent);
  }

  changeMode(to) {
    this.mode = to;
  }

  updateSolid() {
    // this.colorManagerService.changeModuleNumber(this.solidModuleService.length);
    this.updatedSolid ++;
  }
}
