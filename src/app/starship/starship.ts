export interface Starship {
    id: number;
    name: string;
    credits: string; //number? string? cuidado con TS y los tipos de datos
    //pilot: string; //cuidado aqui tambien. Hay que importar la tabla intermedia de pilotos y sus movidas
}