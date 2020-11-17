import { Component, Input, OnInit } from '@angular/core';
import { SolidModuleService } from '../op-solid-module.service';
import { SolidSettingsService } from '../op-solid-settings.service';

@Component({
  selector: 'app-op-learn-module',
  templateUrl: './op-learn-module.component.html',
  styleUrls: ['./op-learn-module.component.scss']
})
export class OpLearnModuleComponent implements OnInit {

  interval;
  readonly second: number;
  @Input() solidModuleService: SolidModuleService;
  @Input() solidSettingsService: SolidSettingsService;


  constructor() {
    this.second = 1000;
  }

  ngOnInit(): void {
  }

  next(){
    this.solidModuleService.next();
    this.solidModuleService.controls.completion = 0;
  }

  previous(){
    this.solidModuleService.previous();
    this.solidModuleService.controls.completion = 0;
  }

  pause(){
    this.solidModuleService.controls.paused = true;
  }
  play(){
    if (this.solidModuleService.controls.completion === 100){
      this.solidModuleService.controls.completion = 0;
    }
    this.solidModuleService.controls.paused = false;
  }

  auto_play(){
    this.solidModuleService.controls.auto_play = !this.solidModuleService.controls.auto_play;
  }
  startAnimation(){

  }
}
