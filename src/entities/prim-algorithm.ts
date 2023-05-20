import { Edge } from "./edge";
import { Graph } from "./graph";
import { GNode } from "./node";

export class PrimAlgorithm<T> {
  public primMST(graph: Graph<T>): Graph<T> {
    const result = new Graph<T>();
    const visited = new Set<GNode<T>>();

    // Pick a starting node
    const startNode = graph.getNodes()[0];
    visited.add(startNode);

    while (visited.size < graph.getNodes().length) {
      let minWeight = Infinity;
      let minEdge: Edge<T> | null = null;

      for (const visitedNode of visited) {
        const neighbors = visitedNode.getNeighbors();
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            const weight = visitedNode.getWeight(neighbor) || 0;
            if (weight < minWeight) {
              minWeight = weight;
              minEdge = { node1: visitedNode, node2: neighbor, weight };
            }
          }
        }
      }

      if (minEdge) {
        const { node1, node2, weight } = minEdge;
        result.addNode(node1.data);
        result.addNode(node2.data);
        result.addEdge(node1.data, node2.data, weight);
        visited.add(node2);
      }
    }

    return result;
  }
}

export const example = () => {
  // Example usage
  const graph = new Graph<string>();

  // Add nodes
  graph.addNode("A");
  graph.addNode("B");
  graph.addNode("C");
  graph.addNode("D");
  graph.addNode("E");

  // Add weighted edges
  graph.addEdge("A", "B", 4);
  graph.addEdge("A", "C", 1);
  graph.addEdge("B", "C", 3);
  graph.addEdge("B", "D", 2);
  graph.addEdge("D", "E", 3);
  graph.addEdge("C", "D", 4);
  graph.addEdge("C", "E", 2);

  const prim = new PrimAlgorithm<string>();
  const minimumSpanningTree = prim.primMST(graph);

  // Print the minimum spanning tree
  console.log("Minimum Spanning Tree:");
  for (const node of minimumSpanningTree.getNodes()) {
    const neighbors = node.getNeighbors();
    for (const neighbor of neighbors) {
      const weight = node.getWeight(neighbor);
      console.log(`${node.data} -- ${weight} -- ${neighbor.data}`);
    }
  }
};
