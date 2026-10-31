export class MinHeap<T> {
  private readonly items: T[] = []
  private readonly compare: (a: T, b: T) => number

  constructor(compare: (a: T, b: T) => number) {
    this.compare = compare
  }

  push(item: T): void {
    const a = this.items
    a.push(item)
    let i = a.length - 1
    while (i > 0) {
      const parent = (i - 1) >> 1
      if (this.compare(a[i]!, a[parent]!) >= 0) break
      ;[a[i], a[parent]] = [a[parent]!, a[i]!]
      i = parent
    }
  }

  pop(): T | undefined {
    const a = this.items
    const top = a[0]
    const last = a.pop()
    if (a.length === 0 || last === undefined) return top
    a[0] = last
    let i = 0
    for (;;) {
      const l = 2 * i + 1
      const r = l + 1
      let min = i
      if (l < a.length && this.compare(a[l]!, a[min]!) < 0) min = l
      if (r < a.length && this.compare(a[r]!, a[min]!) < 0) min = r
      if (min === i) return top
      ;[a[i], a[min]] = [a[min]!, a[i]!]
      i = min
    }
  }
}
