import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ColorManagerService } from '../op-color-manager.service';

@Component({
  selector: 'app-op-pattern',
  templateUrl: './op-pattern.component.html',
  styleUrls: ['./op-pattern.component.scss']
})

export class OpPatternComponent {

  @Input() colorManagerService: ColorManagerService;
  colorValid: ThemePalette;
  colorInvalid: ThemePalette;

  constructor(colorManagerService: ColorManagerService) {
    this.colorManagerService = colorManagerService;
    this.colorValid = 'primary';
    this.colorInvalid = 'warn';
  }

  changePattern(e){
    this.colorManagerService.layout = e.value;
    this.colorManagerService.update();
  }
  changeNumber(e){
    this.colorManagerService.number = e.value;
    this.colorManagerService.update();
  }
}
