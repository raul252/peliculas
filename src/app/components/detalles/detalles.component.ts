import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { PeliculaCompleta, Cast } from 'src/app/Interfaces/Interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
})
export class DetallesComponent implements OnInit {

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }
  oculto: 150;

  estrella: string = 'star-outline';

  pelicula: PeliculaCompleta = {};
  actores: Cast[] = [];
  @Input() id;
  constructor(private moviesService: MoviesService, private modalCrtl: ModalController, private dataLocal: DataLocalService) { }

  ngOnInit() {
    //console.log('ID', this.id);

    this.dataLocal.existePelicula(this.id).then(existe => {
      (this.estrella) = (existe) ? 'star' : 'star-outline';
    });
    
    this.moviesService.getPeliculaDetalle(this.id).subscribe(resp => {
      //console.log(resp);
      this.pelicula = resp;
    });

    this.moviesService.getActores(this.id).subscribe(resp => {
      //console.log(resp);
      this.actores = resp.cast;
    });
  }

  regresar() {
    this.modalCrtl.dismiss();
  }

  favorito() {
    const EXISTE = this.dataLocal.guardarPelicula(this.pelicula);
    this.estrella = (EXISTE) ? 'star' : 'star-outline';
  }
}
