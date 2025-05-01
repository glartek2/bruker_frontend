function range(start: number, end: number): number[] {
  return new Array(end - start).fill(0).map((_, i) => i + start);
}

function rangeTo(end: number): number[] {
  return range(0, end);
}

function times<T>(count: number, init: (key: number) => T): T[] {
  return new Array(count).fill(0).map((_, i) => init(i));
}

export { range, rangeTo, times };
