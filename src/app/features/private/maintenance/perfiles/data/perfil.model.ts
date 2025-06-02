export interface Perfil {
    idePerfil: number;
    perfil?: string;
    codigoPerfil?: string;
}

export interface PerfilRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    datos : Perfil[];
    dato : Perfil;
}