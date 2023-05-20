export class GNode<T> {
  data: T;
  neighbors: Map<GNode<T>, number>;

  constructor(data: T) {
    this.data = data;
    this.neighbors = new Map<GNode<T>, number>();
  }

  public addNeighbor(neighbor: GNode<T>, weight: number = 1) {
    this.neighbors.set(neighbor, weight);
  }

  public removeNeighbor(neighbor: GNode<T>) {
    this.neighbors.delete(neighbor);
  }

  public getNeighbors() {
    return Array.from(this.neighbors.keys());
  }

  public getWeight(neighbor: GNode<T>) {
    return this.neighbors.get(neighbor);
  }
}

export const example = () => {};
