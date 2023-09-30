import { Component, EventEmitter, ViewChild, Output } from '@angular/core';
import { Direccion , Ciudades } from 'src/app/models/direccion';
import { Pedido } from 'src/app/models/pedido';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { PedidoYDireccion } from 'src/app/models/pedidoYDireccion';
import { Estados } from 'src/app/models/estados.enum';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent{
  @Output() pedidoCreado: EventEmitter<PedidoYDireccion> = new EventEmitter<PedidoYDireccion>();
  @Output() cambioEstado: EventEmitter<Estados> = new EventEmitter<Estados>();
  @ViewChild(ImageUploadComponent) componenteHijo: ImageUploadComponent | undefined;
  FormPedido: FormGroup;
  FormDireccionLocal: FormGroup;
  formularioEnviado = false;

  constructor(
    private fb: FormBuilder
    ) {
      this.FormPedido = this.fb.group({
    });

    this.FormDireccionLocal = this.fb.group({
      Calle: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ., 0-9 ]{4,50}')]),
      Numero: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{1,5}')]),
      Ciudad: new FormControl(this.ItemCiudad[0].Nombre, [Validators.required]),
      Referencia: new FormControl('', [Validators.pattern('[A-Z, a-z, 0-9]{1,100}')])
    });
  }

  descripcion: string = '';
  flagTablaPedidos: boolean = true;
  ItemCiudad = Ciudades;
  Pedidos: Pedido[] = [];
  datosFormulario: any;
  imagenes: string[] = [];
  descipcionCargada: boolean = true;

  agregarPedido() {
    let descripcionTextArea = document.getElementById('descripcionPedido');
    let descripcionTextAreaHTML = descripcionTextArea as HTMLTextAreaElement;
    this.descripcion = descripcionTextAreaHTML.value;
    if(this.descripcion.trim() != ''){
      this.descipcionCargada = true;
      let nuevoPedido: Pedido = new Pedido();
      nuevoPedido.Descripcion = this.descripcion;
      nuevoPedido.Imagenes = this.imagenes;
      nuevoPedido.Precio = this.calcularPrecioPedido();
      this.Pedidos.push(nuevoPedido);
      nuevoPedido = new Pedido();
      this.flagTablaPedidos = false;
      this.actualizarImagenesCargadas();
    }else{
      this.descipcionCargada = false;
    }
    this.imagenes = []
    descripcionTextAreaHTML.value = ''
  }
  actualizarImagenesCargadas() {
    if (this.componenteHijo) {
      this.componenteHijo.uploadedFileNames = [];
      this.componenteHijo.archivosSubidos = false;
    }
  }

  enviarFormulario() {
    this.formularioEnviado = true;
    if(!this.FormDireccionLocal.invalid && !this.validarPedidoCargado()){
      const Calle = this.FormDireccionLocal.get('Calle')?.value;
      const Numero = this.FormDireccionLocal.get('Numero')?.value;
      const Ciudad = this.FormDireccionLocal.get('Ciudad')?.value;
      const Referencia = this.FormDireccionLocal.get('Referencia')?.value;
      const direccion:Direccion = {
        Calle,
        Numero,
        Ciudad,
        Referencia
      };
      let pedidoYDireccion = new PedidoYDireccion();
      pedidoYDireccion.pedido = this.Pedidos;
      pedidoYDireccion.direccion = direccion;
      this.pedidoCreado.emit(pedidoYDireccion);
      this.cambioEstado.emit(Estados.Envio);
    }
    return;
  }

  calcularPrecioPedido(): number{
    const random = Math.random() * 100
    return Math.round(random*(this.Pedidos.length+5)*10)
  }

  onImagenesCargadas(imagenes: string[]){
    this.imagenes = imagenes;
    if (this.componenteHijo) {
      this.componenteHijo.archivosSubidos = true;
    }
  }

  validarCampoRequerido(campoAValidar:string){
      let control = this.FormDireccionLocal.get(campoAValidar);
      return (control?.dirty || control?.touched || this.formularioEnviado) && control?.errors?.['required']

  }

  validarPatron(campoAValidar:string){
      let control = this.FormDireccionLocal.get(campoAValidar);
      return (control?.dirty || control?.touched || this.formularioEnviado) && control?.errors?.['pattern']
  }

  validarPedidoCargado(){
    return this.Pedidos.length == 0 && this.formularioEnviado
  }

  validarDescripcion(){

  }

  cargarDireccionConMapa(){
    let calleControl = this.FormDireccionLocal.get('Calle');
    let numeroControl = this.FormDireccionLocal.get('Numero');

    calleControl?.setValue('Maestro M. Lopez');
    numeroControl?.setValue('2700');

    calleControl?.markAsDirty();
    calleControl?.markAsTouched();
    numeroControl?.markAsDirty();
    numeroControl?.markAsTouched();
  }

}
