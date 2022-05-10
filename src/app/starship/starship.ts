export interface Starship {
    id: number;
    name: string;
    credits: string; //number? string? cuidado con TS y los tipos de datos
    //pilot: string; //cuidado aqui tambien. Hay que importar la tabla intermedia de pilotos y sus movidas
}

export interface Pilot {
    id: number;
    name: string;
    //credits: string; //number? string? cuidado con TS y los tipos de datos
    //pilot: string; //cuidado aqui tambien. Hay que importar la tabla intermedia de pilotos y sus movidas
}

export interface PilotShip {
    id: number;
    id_pilot: number;
    id_starship: number;
    //credits: string; //number? string? cuidado con TS y los tipos de datos
    //pilot: string; //cuidado aqui tambien. Hay que importar la tabla intermedia de pilotos y sus movidas
}