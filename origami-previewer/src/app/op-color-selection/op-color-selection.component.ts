import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ColorManagerService } from '../op-color-manager.service';

@Component({
  selector: 'app-op-color-selection',
  templateUrl: './op-color-selection.component.html',
  styleUrls: ['./op-color-selection.component.scss']
})
export class OpColorSelectionComponent {

  @Input() colorManagerService: ColorManagerService;
  rotates: number[];
  presets: string[];
  active: number;
  selectedColor: string;
  @ViewChild('colorpicker', { static: true }) container: ElementRef;
  colorPicker: any;

  constructor(colorManagerService: ColorManagerService) {
    this.colorManagerService = colorManagerService;
    this.presets = [];
    this.presets = this.colorManagerService.storedColors.map((color) => color.color);
    this.rotates = [];
    for (let i = 0; i < 30; i++) {
      this.rotates.push(Math.random() * 10 - 5);
    }
  }

  changeFocusedColor(e: any, i: number, cp: any){
    if (this.active !== i){
      this.removeFocusColor();
      this.active = i;
      this.selectedColor = this.colorManagerService.storedColors[i].color;
      cp.setColor(this.selectedColor);
      e.target.className += ' active';
    } else {
      this.removeFocusColor();
      this.active = undefined;
    }
  }

  removeFocusColor(e?: boolean){
    if (e !== true){
      const divs =  document.getElementsByClassName('active');
      for (const d in divs){
        if (divs[d].classList !== undefined){
          divs[d].classList.remove('active');
        }
      }
    }
    this.active = undefined;
  }

  changeColor(index: number, event: string){
    this.colorManagerService.inputColors[index].color = event;
    this.colorManagerService.update();
  }

  addPreset(event){

    this.presets = event;
  }
  updateSelected(c){
    this.colorManagerService.storedColors[this.active].color = c;
  }
  close(){
    this.active = undefined;
  }

}

