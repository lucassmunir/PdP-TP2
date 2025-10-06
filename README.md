# TP2 – Lista de Tareas (TypeScript estructurado)

## 📘 Descripción
Este proyecto es una **lista de tareas** realizada en **TypeScript**, siguiendo los principios de **Programación Estructurada**, con **Modularización** y **Abstracción**.  
Permite agregar, editar, buscar, eliminar y listar tareas desde la consola.

---

## ⚙️ Requisitos
- **Node.js** versión 18 o superior  
- **npm** (viene incluido con Node)
  
---

## 🚀 Cómo ejecutar el proyecto

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/lucassmunir/PdP-TP2.git
cd TP2
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Ejecutar el programa

#### Opción A: Modo desarrollo (sin compilar)
```bash
npm run dev
```
Ejecuta directamente el archivo `src/principal.ts` usando `ts-node`.

#### Opción B: Compilar y ejecutar la versión JavaScript
```bash
npm run build
npm start
# o manualmente:
node dist/principal.js
```

---

## 📁 Estructura del proyecto
```
src/
 ├── principal.ts                # Programa principal (menú)
 ├── dominio/
 │    └── tipos.ts               # Tipos y enums
 ├── datos/
 │    └── estado.ts              # Arreglo de tareas en memoria
 ├── servicios/
 │    └── tareas.ts              # Lógica principal de gestión
 ├── ui/
 │    ├── consola.ts             # Entrada de usuario (prompt)
 │    └── vista.ts               # Impresión de tareas y menús
 └── utilidades/
      ├── fechas.ts              # Parseo y formato de fechas
      └── orden.ts               # Ordenamientos y comparaciones
```

---

## 🧠 Scripts disponibles
| Comando | Descripción |
|----------|--------------|
| `npm run dev` | Ejecuta el código TypeScript directamente |
| `npm run build` | Compila el código a JavaScript dentro de `/dist` |
| `npm start` | Compila y ejecuta la versión compilada |

---

