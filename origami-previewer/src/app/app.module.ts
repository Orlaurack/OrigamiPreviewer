import { BrowserModule } from '@angular/platform-browser';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
//import { OpScreenComponent } from './op-screen/op-screen.component';
import { OpBackgroundComponent } from './op-background/op-background.component';
import { OpPatternComponent } from './op-pattern/op-pattern.component';
import { OpColorSelectionComponent } from './op-color-selection/op-color-selection.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { OpSettingsComponent } from './op-settings/op-settings.component';
import { OpLearnModuleComponent } from './op-learn-module/op-learn-module.component';
import { OpCanvasScreenComponent } from './op-canvas-screen/op-canvas-screen.component';
import { OpColorPickerComponent } from './op-color-picker/op-color-picker.component';
import { OpGradientGeneratorComponent } from './op-gradient-generator/op-gradient-generator.component';

let gifWorker:any = new Component({
  templateUrl: "./gif/worker"
})

const routes: Routes = [
  { path: 'main', component: AppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    //OpScreenComponent,
    OpBackgroundComponent,
    OpPatternComponent,
    OpColorSelectionComponent,
    OpSettingsComponent,
    OpLearnModuleComponent,
    OpCanvasScreenComponent,
    OpColorPickerComponent,
    OpGradientGeneratorComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    MatRadioModule,
    MatSliderModule,
    NoopAnimationsModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
