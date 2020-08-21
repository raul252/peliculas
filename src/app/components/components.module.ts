import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowParesComponent } from './slideshow-pares/slideshow-pares.component';
import { DetallesComponent } from './detalles/detalles.component';


@NgModule({
  entryComponents: [
    DetallesComponent
  ],
  declarations: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    DetallesComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule
  ],
  exports: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    DetallesComponent
  ]
})
export class ComponentsModule { }
