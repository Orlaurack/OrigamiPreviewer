import { Component, Input, OnInit, Output, ɵɵstaticContentQuery } from '@angular/core';
import { ColorManagerService } from '../op-color-manager.service';

@Component({
  selector: 'app-op-background',
  templateUrl: './op-background.component.html',
  styleUrls: ['./op-background.component.scss']
})

export class OpBackgroundComponent{
  Squares: {s: string, x: string, y: string}[] = [];
  rngIndexes: number[];
  timoutResize: any;
  @Input() lightMode: boolean;
  @Input() colorManagerService: ColorManagerService;

  constructor() {
    this.onResize(true);
  }


  scroll(){
  }

  onResize(noTimout= false){

    clearTimeout(this.timoutResize);
    this.timoutResize = setTimeout(() => {
      this.Squares = [];
      const w = window.innerWidth;
      const h = window.innerHeight;
      const sh = this.lightMode ? 6 : 16;
      const s = h / sh;
      const sw = Math.ceil(w / s);
      const r = (sw * s) - w;
      this.rngIndexes = [];
      for (let i = 0; i < (sh * sw); i++) {
        const x = ((i % sw) * s) - (r / 2);
        const y = (Math.floor(i / sw) % sh) * s;
        if (Math.ceil(Math.random() * 4) === 1){
          this.rngIndexes.push(-1);
        }else{
          this.rngIndexes.push(Math.ceil(Math.random() * this.colorManagerService.showedColors.length - 1));
        }
        this.Squares.push({s: s + 'px', x: x + 'px', y: y + 'px'});
      }
    }, noTimout ? 0 : 250);
  }
}
