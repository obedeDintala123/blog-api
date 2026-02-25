export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // separa acentos das letras
    .replace(/[\u0300-\u036f]/g, '') // remove os acentos
    .trim()
    .replace(/\s+/g, '-') // espaços viram hífen
    .replace(/[^\w-]+/g, '') // remove caracteres especiais
    .replace(/--+/g, '-') // múltiplos hífens viram um só
    .replace(/^-+|-+$/g, ''); // remove hífen do início e fim
}
