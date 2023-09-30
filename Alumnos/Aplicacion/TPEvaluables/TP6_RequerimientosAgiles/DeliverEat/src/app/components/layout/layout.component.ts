import { Component } from '@angular/core';
import { Estados } from 'src/app/models/estados.enum';
import { Pedido } from 'src/app/models/pedido';
import { Direccion } from 'src/app/models/direccion';
import { PedidoYDireccion } from 'src/app/models/pedidoYDireccion';
import { MedioDePago } from 'src/app/models/medio-de-pago';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  estado:Estados = Estados.Pedido;
  pedido:Pedido[];
  direccionPedido:Direccion;
  direccionEnvio:Direccion;
  medioDePago:MedioDePago;
  totalPedido: number;

  onPedidoCreado(pedidoYDireccion: PedidoYDireccion) {
    this.pedido = pedidoYDireccion.pedido;
    this.direccionPedido = pedidoYDireccion.direccion;
  }

  onCambioEstado(estado:Estados){
    this.estado = estado
  }

  onDireccionEnvioCreada(direccionEnvio: Direccion) {
    this.direccionEnvio = direccionEnvio
    console.log(this.direccionEnvio)
    console.log(this.pedido)
    console.log(this.direccionPedido)
  }

  onTotalCalculado(total: number){
    this.totalPedido = total;
  }

}
