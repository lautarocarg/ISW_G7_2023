import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { DireccionEnvioComponent } from './components/direccion-envio/direccion-local.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { MedioDePagoComponent } from './components/medio-de-pago/medio-de-pago.component';
import { EntregaComponent } from './components/entrega/entrega.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PantallaFinalComponent } from './components/pantalla-final/pantalla-final.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    PedidoComponent,
    DireccionEnvioComponent,
    ResumenComponent,
    MedioDePagoComponent,
    EntregaComponent,
    ImageUploadComponent,
    PantallaFinalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
