import { Component, OnInit } from '@angular/core';
import { PeliculaCompleta, Genre } from '../Interfaces/Interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaCompleta[] = [];
  generos: Genre[] = [];
  favoritoGenero: any[] = [];
  constructor(private dataLocalService: DataLocalService, private moviesService: MoviesService) {}

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.peliculas = await this.dataLocalService.cargarFavoritos();
    this.generos = await this.moviesService.cargarGenero();
    this.pelisPorGenero(this.generos, this.peliculas);
  }

  pelisPorGenero(generos:Genre[], peliculas: PeliculaCompleta[]){
    this.favoritoGenero = [];
    generos.forEach(genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter(p => {
          return p.genres.find( genre => genre.id === genero.id)
        })
      })
    });
    console.log(this.favoritoGenero);
  }
}
