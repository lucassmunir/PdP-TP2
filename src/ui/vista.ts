import { Tarea } from "../dominio/tipos";
import { formatear } from "../utilidades/fechas";

export function imprimirLista(lista: Tarea[]): void {
  if (lista.length === 0) { console.log("\n🤖 No hay tareas para mostrar."); return; }
  console.log("\n📋 Lista de tareas:");
  lista.forEach((t, i) => {
    console.log(` ${i + 1}. [${t.estado}] ${t.titulo} (creada: ${formatear(t.creadaEn)} | vence: ${formatear(t.venceEn)})`);
  });
}

export function imprimirDetalle(t: Tarea): void {
  console.log(`\n${t.titulo}\n`);
  console.log(`${t.descripcion || ""}\n`);
  console.log(`  Estado:        ${t.estado}`);
  console.log(`  Dificultad:    ${t.dificultad ?? "--"}`);
  console.log(`  Vencimiento:   ${formatear(t.venceEn)}`);
  console.log(`  Creación:      ${formatear(t.creadaEn)}`);
  console.log(`  Última edición:${formatear(t.ultimaEdicion)}`);
}
