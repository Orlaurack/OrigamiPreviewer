import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SolidSettingsService } from '../op-solid-settings.service';
import { saveSvgAsPng } from 'save-svg-as-png';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { ColorManagerService } from '../op-color-manager.service';
import { RotationService } from '../op-rotation.service';
import { OpUrlManagerService } from '../op-url-manager.service';
import { ScreenService } from '../op-screen.service';
import {  } from '../op-icosaedre.service';
import GIF from '../../gif/gif.js';
//import { Sticker, createSticker, StickerTypes } from 'wa-sticker-formatter' // ES6

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
  @Input() screenService: ScreenService;
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
      /*{
        name: 'icosaedre120',
        value: 'Icosaèdre 2 (4 * 30)'
      },
      {
        name: 'icosaedre270',
        value: 'Icosaèdre 3 (9 * 30)'
      }*/
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
    if (document.querySelector('#screen svg')){
      saveSvgAsPng(document.querySelector('#screen svg'), 'origami_preview.png');
    }else if(document.querySelector('#screen canvas')){
      var image = (document.querySelector('#screen canvas') as HTMLCanvasElement).toDataURL();
      var aDownloadLink = document.createElement('a');
      aDownloadLink.download = 'origami-preview.gif';
      aDownloadLink.href = image;
      aDownloadLink.click();
    }
  }

  saveGIF() {
    //this.solidSettingsService.rotation.x = 10;
    //this.solidSettingsService.rotation.y = 0;
    //// Math.hypot(this.solidSettingsService.rotation.x, this.solidSettingsService.rotation.y)
    //const memInertia = this.solidSettingsService.inertia;
    //this.solidSettingsService.inertia = 0.5;
    
      const steps = 72;
      const finalDelay = 1000/24;
      const fullLoop = 720;
      
      const hyp = Math.hypot(this.solidSettingsService.rotation.x, this.solidSettingsService.rotation.y)
      const newhyp = fullLoop / steps;
      const x = this.solidSettingsService.rotation.x * (newhyp / hyp)
      const y = this.solidSettingsService.rotation.y * (newhyp / hyp)
      const memDef = this.solidSettingsService.definition
      this.solidSettingsService.definition = 512

      function flatten(arr) {
        return arr.reduce(function (flat, toFlatten) {
          return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
        }, []);
      }

      let gif = new GIF({
        workers: 4,
        quality: 1, 
        transparent: null,
        background: null,
        globalPalette: flatten(this.colorManagerService.showedColors.map((c) => {
          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c.color);
          return [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
          ]
        }).concat([0, 0, 0])),
        dither: false,
        width: this.solidSettingsService.definition,
        height: this.solidSettingsService.definition,
      });
      
      for (let index = 0; index < steps; index++) {
        const ctx = this.screenService.generate({x:x,y:y}, true);

        gif.addFrame(
          ctx,
          {
            delay: finalDelay,
          }
        );
      }
      
      gif.render()
      
      gif.on('finished', (blob) => {
        console.log(blob);
        //var aDownloadLink = document.createElement('a');
        //aDownloadLink.download = 'origami-preview.gif';
        //aDownloadLink.href = URL.createObjectURL(blob);
        //aDownloadLink.click();
        /*const sticker = new Sticker(blob, {
          pack: 'Origami previewer', // The pack name
          author: 'Orlaurack', // The author name
          type: StickerTypes.DEFAULT, // The sticker type
          categories: ['⭐️'], // The sticker category
          id: Math.round(Math.random()*100).toString(), // The sticker id
          quality: 100, // The quality of the output file
        })

        sticker.toBuffer().then((result)=>{
          console.log(result);
        }) //*/

        this.solidSettingsService.definition = memDef
      })
    
    /*
    this.solidSettingsService.play = false;
    let frame_number = 36;
    
    let interval_ms = (10000/36) / frame_number;

    let gif = new GIF({
      workers: 1,
      quality: 1,
      background: '#ff0',
      dither: false
    });
    let a = new Date().getTime()

    gif.on('finished', (blob)=>{
      console.log(blob);
      var aDownloadLink = document.createElement('a');
      aDownloadLink.download = 'origami-preview.png';
      aDownloadLink.href = URL.createObjectURL(blob);
      aDownloadLink.click();
    })
    setTimeout(() => {
      let interval = setInterval(()=>{
        frame_number--;
        gif.addFrame(
          document.querySelector('#screen canvas'),
          {
            delay: interval_ms/4,
          }
        );
        
        console.log(frame_number, new Date().getTime()-a);
        if (frame_number == 0){
          clearInterval(interval);

          gif.render()
        }
      }, interval_ms)
    }, 200);

    console.log(gif);
    */
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
    this.colorManagerService.update();

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
    this.colorManagerService.update();

  }

  changeSolid(e) {

    if (isNaN(e.value)) {
      this.solidSettingsService.solidService = e.value;
    }
    this.updateSolid.emit();
  }
}
