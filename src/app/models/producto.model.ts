import { DtProducto } from './dtProducto.model';

export class Producto {
    idproducto: string;
    codProducto: string;
    nombreProducto: string;
    marcaProducto: string;
    unidadMedida: string;
    fechaVencimiento: string;  
    idtipoProducto: string;  
    listaDtProductoDTO: Array<DtProducto>   
}

