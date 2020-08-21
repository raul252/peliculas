import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { RespuestaMDB, Pelicula } from '../Interfaces/Interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

  slideOpts = {
    initialSlide: 1.1,
    slidesPerView: 3,
    freeMode: true  
  };
  constructor(private moviesService:MoviesService) {}

  ngOnInit() {
    this.moviesService.getFeature().subscribe( (resp: RespuestaMDB) => {
        console.log('Resp', resp);
        this.peliculasRecientes = resp.results;
    } );

    this.getPopulares();
  }

  cargarMas() {
    console.log('cargar más tab 1');
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulares().subscribe( resp => {
      console.log('Populares', resp);
      this.populares.push(...resp.results);
      const arrTemp = [...this.populares, ...resp.results];
      this.populares = arrTemp;
    });
  }
}
