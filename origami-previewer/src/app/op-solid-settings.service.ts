import { Injectable, Input, Output } from '@angular/core';
import { OpIcosaedreService } from './op-icosaedre.service';
import { OpIcosaedre120Service } from './op-icosaedre-120.service';
import { OpIcosaedre270Service } from './op-icosaedre-270.service';

@Injectable({
  providedIn: 'root'
})
export class SolidSettingsService {
  @Output() fps: number;
  @Output() inertia: number;
  @Output() rotation: {x: number, y: number};
  @Output() scale: number;
  @Output() fov: number;
  @Output() definition: number;
  @Output() screenHeight: number;
  @Output() picHeight: number;
  @Output() antiAliasing: boolean;
  @Output() solidService: string;
  @Output() play: boolean;
  @Input() isMobile: boolean;


  constructor() {
    this.fps = 60;
    this.inertia = 0.5;
    this.rotation = {x: 1, y: 0};
    this.scale = 1;
    this.fov = 2.5;
    this.definition = 500;
    this.picHeight = 100;
    this.screenHeight = 250;
    this.antiAliasing = false;
    this.solidService = 'icosaedre';
    this.play= false;
  }
}
