import { Component, EventEmitter, Output } from '@angular/core';
import {Direccion , Ciudades } from 'src/app/models/direccion';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Estados } from 'src/app/models/estados.enum';

@Component({
  selector: 'app-direccion-envio',
  templateUrl: './direccion-envio.component.html',
  styleUrls: ['./direccion-envio.component.css']
})
export class DireccionEnvioComponent {
  @Output() direccionEnvioCreada: EventEmitter<Direccion> = new EventEmitter<Direccion>();
  @Output() cambioEstado: EventEmitter<Estados> = new EventEmitter<Estados>();
  FormDireccionEnvioPedido: FormGroup;
  formularioEnviado = false;

  constructor(
    private fb: FormBuilder) {
    this.FormDireccionEnvioPedido = this.fb.group({
      Calle: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ., 0-9 ]{4,50}')]),
      Numero: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{1,5}')]),
      Ciudad: new FormControl(this.ItemCiudad[0].Nombre, [Validators.required]),
      Referencia: new FormControl('', [Validators.pattern('[A-Z, a-z, 0-9]{1,100}')])
    });
  }

  ItemCiudad = Ciudades;

  enviarFormulario() {
    this.formularioEnviado = true;
    if(!this.FormDireccionEnvioPedido.invalid){
      const Calle = this.FormDireccionEnvioPedido.get('Calle')?.value;
      const Numero = this.FormDireccionEnvioPedido.get('Numero')?.value;
      const Ciudad = this.FormDireccionEnvioPedido.get('Ciudad')?.value;
      const Referencia = this.FormDireccionEnvioPedido.get('Referencia')?.value;
      const direccion:Direccion = {
        Calle,
        Numero,
        Ciudad,
        Referencia
      };
      this.direccionEnvioCreada.emit(direccion);
      this.cambioEstado.emit(Estados.Resumen);
    }
    return;

  }
  cargarDireccionConMapa(){
    let calleControl = this.FormDireccionEnvioPedido.get('Calle');
    let numeroControl = this.FormDireccionEnvioPedido.get('Numero');

    calleControl?.setValue('25 de Mayo');
    numeroControl?.setValue('21');

    calleControl?.markAsDirty();
    calleControl?.markAsTouched();
    numeroControl?.markAsDirty();
    numeroControl?.markAsTouched();
  }

  volverAlPedido(){
    this.cambioEstado.emit(Estados.Pedido);
  }

  validarCampoRequerido(campoAValidar:string){

    let control = this.FormDireccionEnvioPedido.get(campoAValidar);
    return (control?.dirty || control?.touched || this.formularioEnviado) && control?.errors?.['required']
}

validarPatron(campoAValidar:string){
    let control = this.FormDireccionEnvioPedido.get(campoAValidar);
    return (control?.dirty || control?.touched || this.formularioEnviado) && control?.errors?.['pattern']
}
}
