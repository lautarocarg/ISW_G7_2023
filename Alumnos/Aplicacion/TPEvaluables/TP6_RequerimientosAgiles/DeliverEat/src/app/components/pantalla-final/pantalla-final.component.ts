import { Component, EventEmitter, Output } from '@angular/core';
import { Estados } from 'src/app/models/estados.enum';

@Component({
  selector: 'app-pantalla-final',
  templateUrl: './pantalla-final.component.html',
  styleUrls: ['./pantalla-final.component.css']
})
export class PantallaFinalComponent {

  @Output() cambioEstado: EventEmitter<Estados> = new EventEmitter<Estados>();

  realizarNuevaCompra(){
    this.cambioEstado.emit(Estados.Pedido);
  }

}
