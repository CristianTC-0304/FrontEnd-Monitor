import { DtProducto } from './dtProducto.model';
import {Marca} from './mark.model';

export class Producto {
    idproducto: string;
    codProducto: string;
    nombreProducto: string;
    marcaProducto: Marca;
    unidadMedida: string;
    fechaVencimiento: string;  
    idtipoProducto: string;  
    listaDtProductoDTO: Array<DtProducto>   
}

