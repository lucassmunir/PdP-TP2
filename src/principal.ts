import { preguntar, pausar } from "./ui/consola";
import { imprimirDetalle, imprimirLista } from "./ui/vista";
import { parsearFechaEntrada } from "./utilidades/fechas";
import { EstadoTarea } from "./dominio/tipos";
import * as svc from "./servicios/tareas";

function elegirOrden(): "ninguno" | "alfabetico" | "vencimiento" | "creacion" {
  console.log("\n📐 ¿En qué orden querés verlas?");
  console.log(" [1] Alfabético  [2] Vencimiento  [3] Creación  [0] Sin orden\n");
  const op = (preguntar(" ") || "").trim();
  const mapa: any = { "1": "alfabetico", "2": "vencimiento", "3": "creacion", "0": "ninguno" };
  return mapa[op] ?? "ninguno";
}

function verLista() {
  console.log("\n🤖 '¿Qué tareas deseas ver?'\n [1] Todas  [2] Pendientes  [3] En curso  [4] Terminadas  [0] Volver\n");
  const o = (preguntar(" ") || "").trim();
  if (o === "0") return;
  const filtro = ({ "1": "todas", "2": "pendientes", "3": "curso", "4": "terminadas" } as const)[o];
  if (!filtro) return console.log("Opción inválida.");
  const orden = elegirOrden();
  const lista = svc.listarTareas(filtro, orden);
  imprimirLista(lista);

  if (lista.length) {
    const sel = (preguntar("\n¿Ver detalles? número o 0 para volver: ") || "").trim();
    if (/^\d+$/.test(sel)) {
      const n = Number(sel);
      if (n >= 1 && n <= lista.length) imprimirDetalle(lista[n - 1]);
    }
  }
  pausar();
}

function buscar() {
  const q = preguntar("Introduce el título a buscar:\n> ").trim();
  if (!q) { console.log("La búsqueda no puede estar vacía."); return pausar(); }
  const r = svc.buscarPorTitulo(q);
  if (!r.length) { console.log("\nNo hay tareas relacionadas."); return pausar(); }
  imprimirLista(r); pausar();
}

function agregar() {
  console.log("\nEstás creando una nueva tarea.\n");
  let titulo = "";
  while (!titulo) { titulo = preguntar("1. Título: ").trim(); if (!titulo) console.log("El título no puede estar vacío."); }
  const descripcion = (preguntar("2. Descripción (opcional): ").trim() || null);

  console.log("3. Estado: [1] Pendiente  [2] En curso  [3] Terminada");
  const estIn = (preguntar("> ").trim().toUpperCase());
  const mapa: any = { "1": EstadoTarea.Pendiente, "2": EstadoTarea.EnCurso, "3": EstadoTarea.Terminada, P: EstadoTarea.Pendiente, E: EstadoTarea.EnCurso, T: EstadoTarea.Terminada };
  const estado = mapa[estIn] ?? EstadoTarea.Pendiente;

  let dificultad: 0|1|2|3|null = null;
  const dif = preguntar("4. Dificultad (0/1/2/3, Enter para omitir): ").trim();
  if (/^[0-3]$/.test(dif)) dificultad = Number(dif) as 0|1|2|3;

  let venceEn: Date | null = null;
  const ingreso = preguntar("5. Vencimiento (YYYY-MM-DD, Enter para omitir): ");
  if (ingreso) {
    const parsed = parsearFechaEntrada(ingreso);
    if (parsed === undefined) console.log("Fecha inválida, se omite."); else venceEn = parsed;
  }

  svc.agregarTarea({ titulo, descripcion, estado, dificultad, venceEn });
  console.log("\n✅ ¡Datos guardados!"); pausar();
}

function eliminar() {
  const lista = svc.listarTareas("todas", "alfabetico");
  imprimirLista(lista);
  const numero = preguntar("\nNúmero de tarea a eliminar (o 0 para cancelar): ").trim();
  if (!/^\d+$/.test(numero) || numero === "0") return;
  const n = Number(numero);
  if (n < 1 || n > lista.length) return console.log("Número inválido.");
  const ok = svc.eliminarTarea(lista[n - 1].id);
  console.log(ok ? "✅ Eliminada." : "No se pudo eliminar."); pausar();
}

function principal() {
  while (true) {
    console.log("\n🤖 ¡Hola! ¿Qué te gustaría hacer?\n [1] Ver lista  [2] Buscar  [3] Agregar  [4] Eliminar  [0] Salir\n");
    const o = Number(preguntar("Ingrese una opción: "));
    switch (o) {
      case 1: verLista(); break;
      case 2: buscar(); break;
      case 3: agregar(); break;
      case 4: eliminar(); break;
      case 0: console.log("\n👋 ¡Hasta luego!"); return;
      default: console.log("Opción no válida."); pausar(); break;
    }
  }
}

principal();
