import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaCompleta } from '../Interfaces/Interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaCompleta[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.cargarFavoritos();
   }

  guardarPelicula(pelicula: PeliculaCompleta) {

    let existe:boolean =false;
    let mensaje: string ='';

    for (const PELI of this.peliculas) {
      if (PELI.id == pelicula.id) {
        existe = true;
        break;
      }
    }

    if (existe) {
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregado a favoritos';
    }
    this.storage.set('peliculas', this.peliculas);
    this.presentToast(mensaje);

    return !existe;
  }

  async presentToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  async cargarFavoritos() {
    const pelis = await this.storage.get('peliculas');
    this.peliculas = pelis || [];
    return this.peliculas;
  }

  async existePelicula(id) {
    id = Number(id);

    await this.cargarFavoritos();
    const EXISTE = this.peliculas.find(p => p.id === id);
    return (EXISTE) ? true: false;
  }
}
