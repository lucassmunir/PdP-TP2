import PromptSync from "prompt-sync";
const prompt = PromptSync({ sigint: true });

export function preguntar(q: string): string { return String(prompt(q) ?? ""); }
export function pausar(): void { prompt("\n(Enter para continuar) "); }
