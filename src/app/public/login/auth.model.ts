//  EN ESTE ARCHIVO SE ENCUENTRAN LAS INTERFACES PARA QUE FUNCIONEN LOS COMPONENTES.
//  CON ESTO SE PUEDE CAPTAR INFORMACIÓN DE ESTE TIPO DESDE EL BACKEND LARAVEL, Y CREAR
//  OBJETOS DE ESTE TIPO

export interface Login {
    email: string;
    password: string;

}

export interface Token {
    token: string;

}
