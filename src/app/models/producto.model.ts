import { DtProducto } from './dtProducto.model';
import {Marca} from './mark.model';
import {TipoProducto} from './tipoProducto.model';

export class Producto {
    idproducto: string;
    codProducto: string;
    nombreProducto: string;
    marcaProducto: Marca;
    unidadMedida: string;
    idtipoProducto: TipoProducto; 
    estado:string; 
    listaDtProductoDTO: Array<DtProducto>   
}

