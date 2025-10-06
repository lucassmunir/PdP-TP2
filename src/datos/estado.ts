import { Tarea } from "../dominio/tipos";

const tareas: Tarea[] = []; // estado en memoria

export function obtenerTodas(): Tarea[] {
  return tareas.map(t => ({ ...t })); // copia defensiva
}

export function obtenerPorId(id: number): Tarea | undefined {
  const t = tareas.find(x => x.id === id);
  return t ? { ...t } : undefined;
}

export function guardar(tarea: Tarea): void {
  tareas.push(tarea);
}

export function actualizar(tarea: Tarea): void {
  const i = tareas.findIndex(x => x.id === tarea.id);
  if (i >= 0) tareas[i] = tarea;
}

export function eliminarPorId(id: number): boolean {
  const antes = tareas.length;
  const i = tareas.findIndex(t => t.id === id);
  if (i >= 0) tareas.splice(i, 1);
  return tareas.length !== antes;
}

export function proximoId(): number {
  return tareas.length ? Math.max(...tareas.map(t => t.id)) + 1 : 1;
}
