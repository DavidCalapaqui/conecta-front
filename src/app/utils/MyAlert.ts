import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MyAlert {

  static async showError(message: string, opts?: { title?: string, timer?: number }) {
    await Swal.fire({
      icon: 'error',
      title: opts?.title ?? 'Ups!',
      text: message,
      timer: opts?.timer ? opts?.timer * 1000 : undefined,
    });
  }

  static async showWarning(message: string, opts?: { title?: string, timer?: number }) {
    await Swal.fire({
      icon: 'warning',
      title: opts?.title ?? 'Vaya!',
      text: message,
      timer: opts?.timer ? opts?.timer * 1000 : undefined,
    });
  }

  static async showSuccess(params: { message: string, title?: string, timer?: number, showConfirmButton?: boolean }) {
    const { title, message, timer, showConfirmButton } = params;
    await Swal.fire({
      icon: 'success',
      title: title ?? 'Genial',
      text: message,
      timer: timer,
      showConfirmButton: showConfirmButton ?? true,
    });
  }

  static async showConfirm(props: { icon?: SweetAlertIcon, title: string, text?: string, confirmButtonText?: string, cancelButtonText?: string }) {
    const { icon, title, confirmButtonText, cancelButtonText, text } = props;
    const res = await Swal.fire({
      icon: icon ?? 'question',
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: confirmButtonText ?? 'Si',
      cancelButtonText: cancelButtonText ?? 'No',
      allowOutsideClick: false,
      customClass:{
        confirmButton: 'btn btn-lg',
        cancelButton: 'btn btn-lg'
      },
      buttonsStyling: true
    });
    return res.isConfirmed;
  }

  static async showLoading(params: { message?: string, timer?: number }) {
    const { message, timer } = params;
    return await Swal.fire({
      icon: 'info',
      text: message ?? 'Cargando',
      showConfirmButton: true,
      confirmButtonText: 'Cancelar',
      timer: timer ? timer * 1000 : undefined,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  static closeAlert() {
    Swal.close();
  }
}
