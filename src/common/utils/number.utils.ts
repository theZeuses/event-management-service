export function parseIntOrFail(input: any): number {
  const parsedInt = parseInt(input, 10);

  if (isNaN(parsedInt)) {
    throw new Error('Failed to parse the input to an integer.');
  }

  return parsedInt;
}

export function parseIntOrFallback(input: any, fallback: number): number {
  const parsedInt = parseInt(input, 10);

  if (isNaN(parsedInt)) {
    return fallback;
  }

  return parsedInt;
}
