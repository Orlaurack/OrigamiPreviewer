import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SolidSettingsService } from '../op-solid-settings.service';
import { saveSvgAsPng } from 'save-svg-as-png';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { ColorManagerService } from '../op-color-manager.service';
import { RotationService } from '../op-rotation.service';
import { OpUrlManagerService } from '../op-url-manager.service';
import {  } from '../op-icosaedre.service';

@Component({
  selector: 'app-op-settings',
  templateUrl: './op-settings.component.html',
  styleUrls: ['./op-settings.component.scss']
})
export class OpSettingsComponent {

  meta: Meta;
  @Output() changeMode: any = new EventEmitter<string>();
  @Output() updateSolid: any = new EventEmitter<void>();

  @Input() gradientGenerator: any;
  @Input() mode: string;
  @Input() solidSettingsService: SolidSettingsService;
  @Input() colorManagerService: ColorManagerService;
  @Input() urlManagerService: OpUrlManagerService;
  @Input() mobileScreen: boolean;
  @Input() svgMode: boolean;

  solids: {name: string, value: string }[];
  colorValid = '#00ff00';
  colorInvalid = '#ff0000';
  rotationService: RotationService;
  test = 0;

  constructor() {
    this.rotationService = new RotationService(this.solidSettingsService);
    this.solids = [
      {
        name: 'tetraedre',
        value: 'Tetraèdre'
      },
      {
        name: 'octaedre',
        value: 'Octaèdre'
      },
      {
        name: 'icosaedre',
        value: 'Icosaèdre'
      },
      {
        name: 'icosaedre120',
        value: 'Icosaèdre 2 (4 * 30)'
      },
      {
        name: 'icosaedre270',
        value: 'Icosaèdre 3 (9 * 30)'
      }
    ];
  }

  change() {}


  saveSVG() {
    const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
      '<?xml version="1.0" standalone="no"?>\r\n' + new XMLSerializer().serializeToString(
        document.getElementById('svg')
      )
    );
    const name = 'origami_preview';
    const element = document.createElement('a');
    element.download = name;
    element.href = url;
    element.click();
    element.remove();
  }

  savePNG() {
    saveSvgAsPng(document.getElementById('svg'), 'origami_preview.png');
  }

  sendToWhatsApp() {
    // todo online feature
    const definitions: MetaDefinition[] =
      [
        {
          property: 'og:locale',
          content: 'fr_FR'
        },
        {
          name: 'description',
          content: 'Une prévisualisation d\'une étoile en origami modulaire.'
        },
        {
          property: 'og:url',
          content: window.location.href
        },
        {
          name: 'og:description',
          content: 'Une prévisualisation d\'une étoile en origami modulaire.'
        },
        {
          property: 'og:image',
          content: '/src/assets/origami_preview.png'
        },
        {
          property: 'og:type',
          content: 'image'
        }
      ];
    const element = document.createElement('a');
    element.href = 'whatsapp://send?text=' + window.location.href;
    element.click();
    element.remove();
  }

  rngColors() {
    for (const inputColor of this.colorManagerService.inputColors) {
      let color = Math.floor(Math.random() * 16777215).toString(16);
      while (color.length < 6) { color = '0' + color; }
      inputColor.color = '#' + color;
    }
  }

  learn() {
    this.mode = 'learn';
    this.changeMode.emit('learn');
  }

  preview() {
    this.mode = 'preview';
    this.changeMode.emit('preview');
  }

  clipboard(element: string) {
    const el = document.createElement('textarea');
    el.value = element;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
  showGradientGenerator() {
    this.gradientGenerator.visible = !this.gradientGenerator.visible;
  }

  changeSolid(e) {

    if (isNaN(e.value)) {
      this.solidSettingsService.solidService = e.value;
    }
    console.log('emit');
    this.updateSolid.emit();
  }
}
