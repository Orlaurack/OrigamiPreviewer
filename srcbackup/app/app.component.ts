import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ColorManagerService } from './op-color-manager.service';
import { SolidModuleService } from './op-solid-module.service';
import { SolidSettingsService } from './op-solid-settings.service';
import { OpUrlManagerService } from './op-url-manager.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  title = 'angular-origami-previewer';
  mouseEvent: any;
  storedColors: {color: string}[] = [];
  showedColors: {color: string}[] = [];
  initialColors: {color: string}[] = [];
  colorManagerService: ColorManagerService;
  solidSettingsService: SolidSettingsService;
  solidModuleService: SolidModuleService;
  urlManagerService: OpUrlManagerService;
  gradientGenerator: any = { visible: false };
  isMobileBrowser: boolean;
  svgMode: boolean;
  mode: string;
  a: string;
  updatedSolid = 0;

  canvasNativeElement: any;
  contextNativeElement: any;
  @ViewChild('canvas_screen') canvas: any;
  @Output() mouseMove = new EventEmitter<any>();

  constructor() {
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
    this.storedColors = this.colorManagerService.storedColors;
    this.showedColors = this.colorManagerService.showedColors;
    setTimeout(() => {
      this.canvasNativeElement = this.canvas.canvas.nativeElement;
      this.contextNativeElement = this.canvasNativeElement.getContext('2d');
    }, 100);
  }

  ngOnInit(){

    console.log(this.canvas)
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
    console.log(this.solidSettingsService.solidService);
    this.updatedSolid ++;
  }
}
