export interface Ciudad {
  Nombre: string;
  Id: number;
}

export const Ciudades: Ciudad[] = [
  {Nombre: 'Cosquin', Id: 1},
  {Nombre: 'Villa Carlos Paz', Id: 2},
  {Nombre: 'Villa General Belgrano', Id: 3},
  {Nombre: 'Santa Rosa de Calamuchita', Id: 4},
  {Nombre: 'Mina Clavero', Id: 5},
  {Nombre: 'Nono', Id: 6},
]

export class Direccion {
  Calle='';
  Numero=0;
  Ciudad='';
  Referencia='';
}
