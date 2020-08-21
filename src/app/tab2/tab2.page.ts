import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../Interfaces/Interfaces';
import { ModalController } from '@ionic/angular';
import { DetallesComponent } from '../components/detalles/detalles.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar: string = '';
  ideas: string[] = ['Spidermam', 'Superman'];
  peliculas:Pelicula[]= [];
  buscando = false;
  constructor(private moviesService: MoviesService,
    private modalCtrl: ModalController) {}

  buscar(event) {
    //console.log(event);
    this.buscando = true;
    const VALOR: string = event.detail.value;

    if (VALOR.length == 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }
    this.moviesService.buscarPeliculas(VALOR).subscribe( resp => {
      //console.log(resp);
      this.peliculas = resp.results;
      this.buscando = false;
    });
  }

  async onclick(id: string) {
    const Modal = await this.modalCtrl.create({
      component: DetallesComponent,
      componentProps: {
        id
      }
    });
    Modal.present();
  }
}
