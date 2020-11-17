import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { StringifyOptions } from 'querystring';

@Component({
  selector: 'app-op-color-picker',
  templateUrl: './op-color-picker.component.html',
  styleUrls: ['./op-color-picker.component.scss']
})
export class OpColorPickerComponent implements OnInit {
  bkred: string;
  bkgreen: string;
  bkblue: string;
  color: string;
  red: number;
  green: number;
  blue: number;

  @Output() colorChanged = new EventEmitter<string>();
  @Output() closeClick = new EventEmitter<boolean>();
  @Input() active: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.setColor('#000000');
  }

  setColor(c: string){
    this.color = c;
    this.red = parseInt(this.color.substring(1, 3), 16);
    this.green = parseInt(this.color.substring(3, 5), 16);
    this.blue = parseInt(this.color.substring(5, 7), 16);
    this.updateGradient();
  }

  private updateGradient(){
    this.bkred = `linear-gradient(90deg, rgb(0, ${this.green}, ${this.blue}), rgb(255, ${this.green}, ${this.blue}))`;
    this.bkgreen = `linear-gradient(90deg,rgb(${this.red}, 0, ${this.blue}), rgb(${this.red}, 255, ${this.blue}))`;
    this.bkblue = `linear-gradient(90deg, rgb(${this.red}, ${this.green}, 0), rgb(${this.red}, ${this.green}, 255))`;
  }

  updateColor(){
    const toHex = (v) => (+v).toString(16).length === 1 ? '0' + ((+v).toString(16)) : ((+v).toString(16));
    this.color = `#${toHex(this.red)}${toHex(this.green)}${toHex(this.blue)}`;
    this.updateGradient();
    this.colorChanged.next(this.color);
  }

  close(){
    this.closeClick.next(true);
  }

}
