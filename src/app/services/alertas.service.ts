import { Injectable } from '@angular/core';

import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor() { }

  alertaSuccess(titulo: string, message: string) {
    Swal.fire({
      title: titulo,
      text: message,
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

  alertaError(message: string) {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}
