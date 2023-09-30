import { Component , Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl, FormBuilder} from "@angular/forms";
import { Estados } from 'src/app/models/estados.enum';
import {MedioDePago} from '../../models/medio-de-pago'
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-medio-de-pago',
  templateUrl: './medio-de-pago.component.html',
  styleUrls: ['./medio-de-pago.component.css']
})
export class MedioDePagoComponent{

  @Output() cambioEstado: EventEmitter<Estados> = new EventEmitter<Estados>();
  @Output() formaDePago: EventEmitter<MedioDePago> = new EventEmitter<MedioDePago>();

  @Input() total: number;

  medioDePago: string = 'Efectivo';
  FormTipoEfectivo: FormGroup;
  FormTipoTarjeta: FormGroup;
  formularioEnviado = false;
  vuelto: number;

  constructor(private formBuilder: FormBuilder){
    this.FormTipoEfectivo = this.formBuilder.group({
        Monto: new FormControl('',[
          Validators.pattern('[0-9,.]{1,6}'),
          Validators.required
        ])
      }
    );
    this.FormTipoTarjeta = this.formBuilder.group({
        NombreApellido: new FormControl('',[
          Validators.required,
          Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ\s ]+$')
        ]),
        NumeroTarjeta: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '[0-9]{16}'
          )
        ]),
        Vencimiento: new FormControl('',[
          Validators.required,
          Validators.pattern(
            '^(0[1-9]|1[0-2])\/(20[0-9][0-9])$'
          ),
        ]),
        CodigoSeguridad: new FormControl('',[
          Validators.required,
          Validators.pattern('^[1-9][1-9][1-9]$')
        ])
    })
  }

  confirmarMedioDePago(){
    this.formularioEnviado = true;
    if((this.medioDePago == 'Efectivo') && !this.FormTipoEfectivo.invalid && this.vuelto >= 0){
      this.cambioEstado.emit(Estados.Entrega);
    }
    else if((this.medioDePago == 'Tarjeta') && !this.FormTipoTarjeta.invalid){
      this.cambioEstado.emit(Estados.Entrega);
    }

    return;
  }

  volverAResumen(){
    this.cambioEstado.emit(Estados.Resumen);
  }

  seleccionarMedioDePago(medioDePago: string){
    this.medioDePago = medioDePago;
  }

  calcularVuelto(){
    const campoMonto = this.FormTipoEfectivo.get('Monto');
    this.vuelto = campoMonto?.value - this.total;
  }

  validarCampoRequerido(campoAValidar:string){
    if(this.medioDePago === 'Efectivo'){
      let control = this.FormTipoEfectivo.get(campoAValidar);
      return (control?.dirty || control?.touched || this.formularioEnviado) && (control?.errors?.['required'])
    }
    else{
      let control = this.FormTipoTarjeta.get(campoAValidar);
    return (control?.dirty || control?.touched || this.formularioEnviado) && control?.errors?.['required']
    }
  }

  validarPatron(campoAValidar:string){
    if(this.medioDePago === 'Efectivo'){
      let control = this.FormTipoEfectivo.get(campoAValidar);
      return (control?.dirty || control?.touched || this.formularioEnviado) && control?.errors?.['pattern']
    }
    else{
      let control = this.FormTipoTarjeta.get(campoAValidar);
    return (control?.dirty || control?.touched || this.formularioEnviado) && control?.errors?.['pattern']
    }
  }

  validarNumeroTarjetaValido(){
    let numeroTarjetaElement = this.FormTipoTarjeta.get('NumeroTarjeta');
    let numeroTarjeta = numeroTarjetaElement?.value;
    if(numeroTarjeta){
      let tarjetaValida = this.luhnAlgorithm(numeroTarjeta)
      let esVisa = numeroTarjeta.toString()[0] == '4';
      return tarjetaValida && esVisa
    }

    return !(numeroTarjetaElement?.touched && numeroTarjetaElement?.dirty);
  }

  validarFecha(){
    let vencimientoElement = this.FormTipoTarjeta.get('Vencimiento');
    let vencimiento = vencimientoElement?.value;
    if(vencimiento){
      let vencimientoValido = this.validateExpiry(vencimiento)
      return vencimientoValido
    }

    return !(vencimientoElement?.touched && vencimientoElement?.dirty);

  }

  luhnAlgorithm(valorAVerificar:string) {
        let value = valorAVerificar.toString()
    // accept only digits, dashes or spaces
        if (/[^0-9-\s]+/.test(value)) return false;
        console.log(typeof value)
    // The Luhn Algorithm. It's so pretty.
        var nCheck = 0, nDigit = 0, bEven = false;
        value = value.replace(/\D/g, "");

        for (var n = value.length - 1; n >= 0; n--) {
            var cDigit = value.charAt(n),
                nDigit = parseInt(cDigit, 10);

            if (bEven) {
                if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
        }

        return (nCheck % 10) == 0;
  }

  validateExpiry (input:any) {
    // ensure basic format is correct
    if (input.match(/^(0[1-9]|1[0-2])\/(20[0-9][0-9])$/)) {
      const {0: month, 1: year} = input.split("/");

      // get midnight of first day of the next month
      var correctYear = parseInt(year);
      const expiry = new Date(correctYear, month);
      const current = new Date();

      return expiry.getTime() > current.getTime();

    } else return false;
  }

  enviarFormulario() {
    const tipoDeMedioDePago = this.medioDePago;

    const nombreApellido = this.FormTipoTarjeta.get('NombreApellido')?.value;
    const numeroTarjeta = this.FormTipoTarjeta.get('NumeroTarjeta')?.value;
    const fechaVencimiento = this.FormTipoTarjeta.get('Vencimiento')?.value;
    const codigoSeguridad = this.FormTipoTarjeta.get('CodigoSeguridad')?.value;

    const monto = this.FormTipoEfectivo.get('Monto')?.value;

    const medioDePago: MedioDePago = {
      tipoDeMedioDePago,
      nombreApellido,
      numeroTarjeta,
      fechaVencimiento,
      codigoSeguridad,
      monto
    }
    this.formaDePago.emit(medioDePago);
    this.cambioEstado.emit(Estados.Entrega);
  }

}
