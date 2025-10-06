export function parsearFechaEntrada(s: string | null | undefined): Date | null | undefined {
  const crudo = String(s ?? "");
  if (crudo === " ") return null;      // convención: espacio = borrar
  const str = crudo.trim();
  if (!str) return null;               // Enter = mantener
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str);
  if (!m) return undefined;
  const d = new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00`);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export function formatear(d: Date | null | undefined): string {
  return d ? d.toISOString().slice(0, 10) : "Sin datos";
}
