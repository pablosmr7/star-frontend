export interface Starship {
    id: number;
    name: string;
    credits: number; //number? string? cuidado con TS y los tipos de datos
    //pilot: number; //cuidado aqui tambien. Hay que importar la tabla intermedia de pilotos y sus movidas
}