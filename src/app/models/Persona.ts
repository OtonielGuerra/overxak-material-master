export class Persona {
    constructor(public primer_nombre: string,
        public segundo_nombre: string,
        public primer_apellido: string,
        public segundo_apellido: string,
        public estado_civil: string,
        public apellido_conyugal : string,
        public fecha_nacimiento: Date,
        public religion : string,
        public correos: Array<any>,
        public genero: string,
        public role: string,
        public departamento: string,
        public municipio: string,
        public zona: number,
        public colonia: string,
        public avenida: string,
        public calle: string,
        public manzana: string,
        public noCasa : string,
        public sector: string,
        public cuadra: string,
        public edificio: string,
        public piso: string,
        public apto: string,
        public numeros: Array<any>
    ){
 
    }
}