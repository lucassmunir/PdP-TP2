export enum EstadoTarea {
  Pendiente = "Pendiente",
  EnCurso = "En curso",
  Terminada = "Terminada",
}

export type Dificultad = 0 | 1 | 2 | 3 | null;

export type Tarea = {
  id: number;
  titulo: string;
  descripcion: string | null;
  estado: EstadoTarea;
  dificultad: Dificultad;
  creadaEn: Date;
  venceEn: Date | null;
  ultimaEdicion: Date | null;
};

export function tituloValido(t: string): boolean {
  return !!t && t.trim().length > 0;
}
