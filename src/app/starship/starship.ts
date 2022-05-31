//  EN ESTE ARCHIVO SE ENCUENTRAN LAS INTERFACES PARA QUE FUNCIONEN LOS COMPONENTES.
//  CON ESTO SE PUEDE CAPTAR INFORMACIÓN DE ESTE TIPO DESDE EL BACKEND LARAVEL, Y CREAR
//  OBJETOS DE ESTE TIPO

export interface Starship {
    id: number;
    name: string;
    model:string;
    manufacturer:string;
    credits: string;
}

export interface Pilot {
    id: number;
    name: string;

}

export interface PilotShip {
    id: number;
    id_pilot: number;
    id_starship: number;
    pilot?: Pilot;

}