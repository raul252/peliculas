import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from 'src/app/Interfaces/Interfaces';
import { ModalController } from '@ionic/angular';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculasRecientes:Pelicula[] = [];

  slideOpts = {
    initialSlide: 1.1,
    slidesPerView: 3,
    freeMode: true  
  };

  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async verDetalle(id: string) {
    const MODAL = await this.modalCtrl.create({
      component: DetallesComponent,
      componentProps: {
        id
      }
    });
    MODAL.present();
  }
}
