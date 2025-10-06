import { Tarea, EstadoTarea, Dificultad, tituloValido } from "../dominio/tipos";
import * as bd from "../datos/estado";
import { ClaveOrden, ordenarTareas } from "../utilidades/orden";

export type FiltroLista = "todas" | "pendientes" | "curso" | "terminadas";

export function listarTareas(filtro: FiltroLista, orden: ClaveOrden): Tarea[] {
  let datos = bd.obtenerTodas();
  if (filtro === "pendientes") datos = datos.filter(t => t.estado === EstadoTarea.Pendiente);
  if (filtro === "curso")      datos = datos.filter(t => t.estado === EstadoTarea.EnCurso);
  if (filtro === "terminadas") datos = datos.filter(t => t.estado === EstadoTarea.Terminada);
  return ordenarTareas(datos, orden);
}

export function buscarPorTitulo(q: string): Tarea[] {
  const s = q.trim().toLowerCase();
  return bd.obtenerTodas().filter(t => t.titulo.toLowerCase().includes(s));
}

export function agregarTarea(params: {
  titulo: string; descripcion: string | null; estado: EstadoTarea;
  dificultad: Dificultad; venceEn: Date | null;
}): Tarea {
  if (!tituloValido(params.titulo)) throw new Error("Título inválido");
  const ahora = new Date();
  const tarea: Tarea = {
    id: bd.proximoId(),
    titulo: params.titulo.trim(),
    descripcion: params.descripcion,
    estado: params.estado,
    dificultad: params.dificultad ?? null,
    creadaEn: ahora,
    venceEn: params.venceEn ?? null,
    ultimaEdicion: ahora,
  };
  bd.guardar(tarea);
  return tarea;
}

export function actualizarTarea(id: number, cambios: Partial<Omit<Tarea, "id" | "creadaEn">>): Tarea | null {
  const actual = bd.obtenerPorId(id);
  if (!actual) return null;
  const actualizado: Tarea = { ...actual, ...cambios, ultimaEdicion: new Date() };
  bd.actualizar(actualizado);
  return actualizado;
}

export function eliminarTarea(id: number): boolean {
  return bd.eliminarPorId(id);
}
