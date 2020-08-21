import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from 'src/app/Interfaces/Interfaces';
import { ModalController } from '@ionic/angular';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  constructor(private modalCtrl: ModalController) { }

  slideOpts = {
    initialSlide: 3.3,
    slidesPerView: 3,
    freeMode: true  
  };

  ngOnInit() {}

  async verDetalle(id: string) {
    const Modal = await this.modalCtrl.create({
      component: DetallesComponent,
      componentProps: {
        id
      }
    });
    Modal.present();
  }

}
