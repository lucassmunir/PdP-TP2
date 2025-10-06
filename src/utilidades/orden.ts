import { Tarea } from "../dominio/tipos";

export type ClaveOrden = "ninguno" | "alfabetico" | "vencimiento" | "creacion";

export function ordenarTareas(lista: Tarea[], por: ClaveOrden): Tarea[] {
  const L = [...lista];
  switch (por) {
    case "alfabetico":
      L.sort((a, b) => a.titulo.localeCompare(b.titulo, "es", { sensitivity: "base" }));
      break;
    case "vencimiento":
      L.sort((a, b) => {
        const va = a.venceEn ? a.venceEn.getTime() : Number.POSITIVE_INFINITY;
        const vb = b.venceEn ? b.venceEn.getTime() : Number.POSITIVE_INFINITY;
        return va - vb;
      });
      break;
    case "creacion":
      L.sort((a, b) => a.creadaEn.getTime() - b.creadaEn.getTime());
      break;
  }
  return L;
}
