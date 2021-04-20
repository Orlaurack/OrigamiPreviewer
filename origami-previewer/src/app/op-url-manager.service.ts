import { Injectable } from '@angular/core';
import { ColorManagerService } from './op-color-manager.service';

@Injectable({
  providedIn: 'root'
})
export class OpUrlManagerService {

  url: URLSearchParams;
  colorManagerService: ColorManagerService;
  mode: string;

  constructor(colorManagerService: ColorManagerService) {
    this.colorManagerService = colorManagerService;
    this.mode = 'learn';
    this.url = new URLSearchParams(document.location.search);
    if (this.url.has('l') && this.url.has('n')){
      const n = parseInt(this.url.get('n'), 10);
      const l = this.url.get('l');
      if (this.colorManagerService.checkShema(l + n)){
        this.colorManagerService.number = n;
        this.colorManagerService.layout = l;
      }
    }
    if (this.url.has('c')){
      const c = this.url.get('c');
      if (c.length%6==0){
        this.colorManagerService.storedColors = c.match(/.{1,6}/g).map((color: string) => ({color: '#' + color}));
        while(this.colorManagerService.storedColors.length<30){
          this.colorManagerService.storedColors.push({color: '#ffffff'})
        }
      }
    }
    if (this.url.has('m')){
      this.mode = this.url.get('m');
    }
    this.colorManagerService.update();
  }

  generateUrl() {

    this.url.set('l', this.colorManagerService.layout);
    this.url.set('n', this.colorManagerService.number.toString());
    this.url.set('m', this.mode);
    this.url.set('c', this.colorManagerService.inputColors.map(color => color.color.substring(1, 7)).join(''));

    window.history.replaceState({}, '', `${location.pathname}?${this.url}`);
    return `${location.pathname}?${this.url}`;

  }

}
