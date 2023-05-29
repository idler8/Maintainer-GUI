export default function autoCharacter(value: number) {
  if (value > 0.01) return value * 100 + "%";
  return value * 1000 + "‰";
}
