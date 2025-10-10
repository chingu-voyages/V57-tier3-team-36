export default function sanitizeToValidUsername(input: string): string {
  return input
    .replace(/[^a-zA-Z0-9-]/g, '')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
    .slice(0, 39);
}
