import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/Interfaces/Interfaces';
import { DetallesComponent } from '../detalles/detalles.component';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  
  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();
  constructor(private modalCtrl: ModalController) { }

  slideOpts = {
    initialSlide: 1.1,
    slidesPerView: 3,
    freeMode: true,
    spaceBetween: -10
  };
  
  ngOnInit() {}

  onClick(){
    console.log('cargar más');
    this.cargarMas.emit();
  }

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
