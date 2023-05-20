import { SVG, Svg, registerWindow } from "@svgdotjs/svg.js";
import * as fs from "fs";
import { Graph } from "./graph";
import { GNode } from "./node";

const window = require("svgdom");
console.log(window.document);
export class GraphDrawer<T> {
  private canvas: any;
  private nodeRadius: number = 20;
  private edgeColor: string = "#333333";
  private backgroundColor: string = "#ffffff";
  private width: number;
  private height: number;

  constructor(
    width: number = 500,
    height: number = 500,
    backgroundColor: string = "#ffffff"
  ) {
    registerWindow(window, window.document);
    const document = window.document;

    this.canvas = SVG(document.documentElement);
    this.canvas.size(width, height);
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;
  }

  private randomColor(): string {
    const r = Math.floor(Math.random() * 100) + 155;
    const g = Math.floor(Math.random() * 100) + 155;
    const b = Math.floor(Math.random() * 100) + 155;

    return `rgb(${r},${g},${b})`;
  }

  private randomPosition(): [number, number] {
    const x = Math.random() * this.width;
    const y = Math.random() * this.height;
    return [x, y];
  }

  public drawGraph(graph: Graph<T>): GraphDrawer<T> {
    graph.getNodes().forEach((node) => {
      const [x, y] = this.randomPosition();
      this.drawNode(node, x, y);
      this.drawEdges(node, x, y);
    });
    return this;
  }

  public save(fileName: string) {
    // get inner svg
    const svg = this.canvas.svg();
    // write to file
    fs.writeFileSync(fileName, svg);
  }

  private drawNode(node: GNode<T>, x: number, y: number) {
    const circle = this.canvas.circle(this.nodeRadius * 2).center(x, y);
    circle.fill(this.randomColor()).stroke({ width: 1, color: "#333333" });
    const text = this.canvas
      .text(node.data ? node.data.toString() : "")
      .center(x, y);
    text.font({ size: 12, weight: "bold" });
  }

  private drawEdges(node: GNode<T>, x: number, y: number) {
    const neighbors = node.getNeighbors();
    neighbors.forEach((neighbor) => {
      const weight = node.getWeight(neighbor) || 0;
      const [neighborX, neighborY] = this.randomPosition();

      const line = this.canvas.line(x, y, neighborX, neighborY);

      line.stroke({ width: 1, color: this.randomColor() });

      const textX = (x + neighborX) / 2;
      const textY = (y + neighborY) / 2;
      const text = this.canvas.text(weight.toString()).center(textX, textY);
      text.font({ size: 10 });
    });
  }
}

export const example = () => {
  // Example usage
  const graph = new Graph<string>();

  // Add nodes
  graph.addNode("A");
  graph.addNode("B");
  graph.addNode("C");

  // Add weighted edges
  graph.addEdge("A", "B", 4);
  graph.addEdge("B", "C", 2);
  graph.addEdge("C", "A", 3);

  const graphDrawer = new GraphDrawer<string>()
    .drawGraph(graph)
    .save("graph.svg");
};
