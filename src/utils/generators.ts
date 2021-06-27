export function labelId(): string {
  const random = ~~(Math.random() * 100000);
  return random.toString(16);
}
