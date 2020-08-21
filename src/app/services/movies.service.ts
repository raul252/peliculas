import { Injectable, Query } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaCompleta, RespuestaCredits, Genre } from '../Interfaces/Interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const APIKEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  private generos:Genre[] = [];

  private ejecutarQuery<T>(query: string) {
    query = URL + '/3/' + query,
    query += `&api_key=${ APIKEY }&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }
  constructor(private http: HttpClient) { }

  getFeature() {
    const HOY = new Date();
    const ULTIMODIA = new Date(HOY.getFullYear() -1, HOY.getMonth() -1, 0).getDate();
    const MES = HOY.getMonth() +1;
    let mesString;

    if(MES < 10) {
      mesString = '0' + MES;
    } else {
      mesString = MES;
    }

    const INICIO = `${HOY.getFullYear()}-${mesString}-01`;
    const FIN = `${HOY.getFullYear()}-${mesString}-${ULTIMODIA}`;

    return this.ejecutarQuery<RespuestaMDB>(`discover/movie?primary_release_date.gte${INICIO}&primary_release_date.lte=${FIN}`);
  }

  getPopulares() {
    this.popularesPage++;
    const QUERY = `discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    
    return this.ejecutarQuery<RespuestaMDB>(QUERY);
  }

  getPeliculaDetalle(id: string) {
    return this.ejecutarQuery<PeliculaCompleta>(`movie/${id}?a=1`);
  }

  getActores(id: string) {
    return this.ejecutarQuery<RespuestaCredits>(`movie/${id}/credits?a=1`);
  }

  buscarPeliculas(texto: string) {
    return this.ejecutarQuery<RespuestaMDB>(`search/movie?query=${texto}`);
  }

  cargarGenero(): Promise<Genre[]> {
    return new Promise(resolve => {
      this.ejecutarQuery(`genre/movie/list?a=1`).subscribe( resp =>{
        this.generos = resp['genres'];
        console.log(this.generos);
        resolve(this.generos);
      });
    });
  }
}
