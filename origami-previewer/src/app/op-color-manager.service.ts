import { ThrowStmt } from '@angular/compiler';
import { Injectable, Input, Output, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ColorManagerService {
  @Output() readonly SHEMAS: {
    unic1: number[],
    grad2: number[],
    line2: number[],
    grav2: number[],
    spca2: number[],
    grad3: number[],
    mixe3: number[],
    grav3: number[],
    spca3: number[],
    line4: number[],
    grad4: number[],
    grav4: number[],
    mixe5: number[],
    grav5: number[],
    grad5: number[],
    spca5: number[],
    grad6: number[],
    grav6: number[],
    mixe6: number[],
    line7: number[],
    grav7: number[],
    grav8: number[],
    grav9: number[],
    grav10: number[],
    mixe15: number[],
    mixe30: number[],
    mixe90: number[],
    mixe270: number[]
  };
  @Output() readonly LAYOUTS: {name: string, value: string}[];
  @Output() readonly NUMBERS: number[];

  @Output() layout: string;
  @Output() number: number;
  @Output() validLayouts: string[];
  @Output() validNumbers: number[];
  @Output() shemaName: string;
  @Output() shema: number[];
  @Output() backgroundColor: string;

  @Input() storedColors: {color: string}[] = [];
  @Input() showedColors: {color: string}[] = [];
  @Input() inputColors: {color: string}[] = [];

  moduleNumber: number;



  constructor() {
    this.moduleNumber = 30;
    this.SHEMAS = {
      unic1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      grad2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
      grav2: [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0],
      line2: [0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0],
      spca2: [0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
      grad3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2],
      grav3: [1, 0, 1, 1, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 1, 1],
      mixe3: [0, 1, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 0, 1, 2, 1, 0, 2, 1, 0, 1, 0, 2, 1, 2, 1, 0, 2, 2, 0],
      spca3: [0, 0, 0, 1, 1, 1, 0, 0, 0, 2, 2, 2, 0, 1, 0, 1, 1, 1, 2, 2, 0, 2, 0, 2, 2, 2, 1, 1, 2, 1],
      line4: [1, 0, 2, 2, 3, 3, 3, 0, 0, 2, 2, 3, 3, 3, 0, 0, 3, 2, 2, 3, 3, 0, 0, 3, 2, 2, 3, 3, 1, 0],
      grad4: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 3, 3, 3, 3, 3],
      grav4: [1, 1, 1, 2, 2, 3, 3, 2, 2, 0, 1, 0, 0, 0, 0, 1, 2, 3, 2, 3, 3, 3, 2, 1, 1, 2, 0, 1, 2, 1],
      mixe5: [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 1, 2, 3, 0, 4, 2, 0, 1, 4, 2, 3, 1, 4, 0, 3, 2, 4, 1, 0, 3],
      grad5: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 2, 2, 3, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 4, 4, 4, 4, 4],
      grav5: [1, 1, 2, 3, 3, 4, 4, 3, 2, 0, 1, 0, 0, 0, 0, 1, 2, 4, 3, 4, 4, 4, 3, 2, 1, 2, 0, 1, 3, 2],
      spca5: [0, 1, 2, 0, 3, 1, 4, 0, 1, 3, 2, 4, 3, 1, 3, 0, 4, 2, 3, 4, 2, 1, 3, 4, 1, 2, 3, 4, 0, 1],
      grad6: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 3, 2, 4, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 5, 5, 5, 5, 5],
      grav6: [2, 1, 2, 3, 4, 5, 4, 3, 3, 1, 1, 0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 4, 4, 2, 2, 3, 1, 1, 3, 2],
      mixe6: [0, 1, 2, 3, 1, 4, 3, 0, 4, 2, 5, 4, 5, 1, 0, 3, 5, 2, 4, 5, 1, 0, 5, 3, 2, 1, 3, 4, 2, 0],
      line7: [1, 0, 2, 2, 6, 4, 4, 0, 5, 3, 2, 4, 6, 4, 0, 0, 6, 2, 3, 4, 6, 0, 0, 6, 2, 2, 6, 4, 1, 5],
      grav7: [2, 2, 3, 4, 4, 6, 5, 4, 3, 1, 2, 0, 0, 0, 1, 2, 3, 5, 4, 6, 6, 5, 4, 3, 2, 3, 1, 2, 4, 3],
      grav8: [3, 2, 3, 4, 5, 7, 6, 4, 4, 1, 2, 0, 0, 0, 1, 3, 4, 6, 5, 7, 7, 6, 5, 3, 3, 4, 1, 2, 4, 3],
      grav9: [3, 2, 4, 5, 6, 8, 7, 5, 4, 1, 2, 0, 0, 0, 1, 3, 4, 7, 6, 8, 8, 7, 6, 4, 3, 4, 1, 2, 5, 4],
      grav10: [3, 2, 4, 6, 7, 9, 8, 6, 5, 1, 2, 0, 0, 0, 1, 3, 5, 8, 7, 9, 9, 8, 7, 4, 3, 5, 1, 2, 6, 4],
      mixe15: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 5, 13, 7, 14, 10, 9, 11, 12, 1, 13, 14, 3, 2, 4, 6, 0, 8],
      mixe30: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
      mixe90: Array.from(Array(90).keys()),
      mixe270: Array.from(Array(270).keys())

    };
    this.LAYOUTS = [
      {name: 'unic', value: 'Pleine'},
      {name: 'grad', value: 'Dégradé'},
      {name: 'grav', value: 'Dégradé verticale'},
      {name: 'mixe', value: 'Mélange'},
      {name: 'line', value: 'Lignes'},
      {name: 'zone', value: 'Zones'},
      {name: 'spca', value: 'Spécial'}
    ];
    this.NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 30, 90, 270];
    for (const color of
      [
        "#1f9739",
        "#55770e",
        "#2a4c3b",
        "#561557",
        "#203582",
        "#3b3ac8",
        "#0f71ac",
        "#2ab3c5",
        "#0fad7f",
        "#3ad953",
        "#6ff97d",
        "#7fe238",
        "#90a60d",
        "#c5c638",
        "#9b5b0f",
        "#d64d3b",
        "#9b1f3c",
        "#910783",
        "#c627ad",
        "#811ec8",
        "#705af3",
        "#ab89f2",
        "#65a5f1",
        "#65e1c4",
        "#aaeba9",
        "#d6b4c5",
        "#e0cb7e",
        "#f18f54",
        "#e169c7",
        "#f15381"
      ]
                         ) {
      this.storedColors.push({color});
      this.showedColors.push({color});
    }
    this.number = 30;
    this.layout = 'mixe';
    this.shema = this.SHEMAS.mixe30;
    this.validLayouts = [];
    this.validNumbers = [];
  }

  update() {

    this.validLayouts = [];
    this.validNumbers = [];
    for (const shemaName of Object.keys(this.SHEMAS)) {
      if (shemaName.includes(this.layout)) {
        this.validNumbers.push(parseInt(shemaName.replace(this.layout, ''), 10));
      }
      if (shemaName.includes(this.number.toString())) {
        this.validLayouts.push(shemaName.replace(this.number.toString(), ''));
      }
    }

    if (this.layout + this.number in this.SHEMAS) {
      this.shemaName = this.layout + this.number;
      this.shema = this.SHEMAS[this.shemaName];

      this.inputColors = [];
      for (let index = 0; index < this.number; index++) {
        this.inputColors.push(this.storedColors[index]);
      }
    }
    let i = 0;
    for (const index of this.shema) {
      this.showedColors[i++] = this.inputColors[index];
    }
    this.calculBackgroundColor();
  }

  checkShema(shema: string) {return this.SHEMAS[shema] !== undefined; }

  calculBackgroundColor() {
    const bk: {r: number, g: number, b: number}[] = this.showedColors.map(
      (color) => (
        {
          r: parseInt(color.color.substring(1, 3), 16),
          g: parseInt(color.color.substring(3, 5), 16),
          b: parseInt(color.color.substring(5, 7), 16)
        }
      )
    );
    let r = 0;
    let g = 0;
    let b = 0;
    for (const c of bk) {
      r += c.r;
      g += c.g;
      b += c.b;
    }
    this.backgroundColor = `#${
      Math.min(Math.round(r / bk.length) + 64, 255).toString(16)}${
      Math.min(Math.round(g / bk.length) + 64, 255).toString(16)}${
      Math.min(Math.round(b / bk.length) + 64, 255).toString(16)}`;
  }
  changeModuleNumber(moduleNumber: number) {
    this.moduleNumber = moduleNumber;
  }
}
