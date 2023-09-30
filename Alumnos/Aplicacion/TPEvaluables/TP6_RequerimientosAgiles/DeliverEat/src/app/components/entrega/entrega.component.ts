import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Estados } from 'src/app/models/estados.enum';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.css'],
})
export class EntregaComponent {
  @Output() cambioEstado: EventEmitter<Estados> = new EventEmitter<Estados>();
  FormTipoEntrega: FormGroup;
  FormFechaHora: FormGroup;
  tipoEntregaSeleccionada = 'loAntesPosible';
  formularioEnviado = false;
  fechaValida = false;

  constructor(private fb: FormBuilder) {
    this.FormTipoEntrega = fb.group({
      Forma: new FormControl(true, [Validators.required]),
    });
    this.FormFechaHora = fb.group({
      Fecha: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern(
          '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](20)[2-3][0-9]'
        ),
      ]),
      Hora: new FormControl('', [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(5),
        Validators.pattern('(0[89]|1[0-9]|2[0-2])[-:]([0-5][0-9])'),
      ]),
    });
  }

  confirmarEntrega() {
    this.validarFecha();
    this.formularioEnviado = true;
    if (
      this.tipoEntregaSeleccionada == 'fechaHoraParticular' &&
      this.fechaValida == true &&
      !this.FormFechaHora.invalid
    ) {
      this.cambioEstado.emit(Estados.Finalizado);
    }
    else if(this.tipoEntregaSeleccionada == 'loAntesPosible'){
      this.cambioEstado.emit(Estados.Finalizado);
    }
    return;
  }

  volverAMedioDePago() {
    this.cambioEstado.emit(Estados.Pago);
  }

  validarFecha(){
    const fecha = this.FormFechaHora.get('Fecha')?.value;
    const hora = this.FormFechaHora.get('Hora')?.value;
    if(this.validarRangoFecha(fecha, hora) && this.formularioEnviado){
      this.fechaValida = true;
    }else{
      this.fechaValida = false;
    }
  }

  validarRangoFecha(fecha:string, horaCargada:string):boolean{
    let fechaActual = new Date();

    let partesFecha = fecha.split('/');
    let dia = parseInt(partesFecha[0], 10);
    let mes = parseInt(partesFecha[1], 10) - 1;
    let año = parseInt(partesFecha[2], 10);

    let partesHora = horaCargada.split(':');
    let hora = parseInt(partesHora[0],10);
    let minutos = parseInt(partesHora[1],10);

    let fechaIngresada = new Date(año, mes, dia, hora, minutos);

    if(fechaIngresada<fechaActual){
      return false;
    }

    //Verificar que el tiempo no sea mayor a una semana
    let diferencia = fechaIngresada.getTime() - fechaActual.getTime();
    let unaSemanaEnMilisegundos = 7 * 24 * 60 * 60 * 1000;

    if (diferencia <= unaSemanaEnMilisegundos) {
        //Verficiar que si es sabado no sea mayor a las 11 horas
        if(
          (fechaIngresada.getDay() == 6 && fechaIngresada.getHours()>=11) ||
          (fechaIngresada.getDay() == 0 )){
          return false;
        }
      return true;
    }
    else{
      return false;
    }

  }


  validarCampoRequerido(campoAValidar: string) {
    let control = this.FormFechaHora.get(campoAValidar);
    return (
      (control?.dirty || control?.touched || this.formularioEnviado) &&
      control?.errors?.['required']
    );
  }

  validarPatron(campoAValidar: string) {
    let control = this.FormFechaHora.get(campoAValidar);
    return (
      (control?.dirty || control?.touched || this.formularioEnviado) &&
      control?.errors?.['pattern']
    );
  }
}
