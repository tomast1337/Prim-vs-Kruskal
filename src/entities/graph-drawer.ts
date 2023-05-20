import rough from "roughjs";
import * as fs from "fs";
import { Graph } from "./graph";
import { GNode } from "./node";
import { DOMImplementation, XMLSerializer } from "xmldom";
import { RoughSVG } from "roughjs/bin/svg";
import { create } from "random-seed";

const rand = create("1");

export class GraphDrawer<T> {
  private svgNode: SVGElement;
  private roughSVG: RoughSVG;
  private document: Document;

  private nodeRadius: number = 20;
  private edgeColor: string = "#333333";
  private width: number;
  private height: number;

  constructor(width: number = 500, height: number = 500) {
    const document = new DOMImplementation().createDocument(
      "http://www.w3.org/1999/xhtml",
      "html",
      null
    );
    const svgNode = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgNode.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgNode.setAttribute("version", "1.1");
    svgNode.setAttribute("width", width.toString());
    svgNode.setAttribute("height", height.toString());
    svgNode.setAttribute("viewBox", `0 0 ${width} ${height}`);
    document.documentElement.appendChild(svgNode);

    this.document = document;
    this.roughSVG = rough.svg(svgNode);
    this.svgNode = svgNode;
    this.width = width;
    this.height = height;
  }

  private randomColor(): string {
    const r = Math.floor(rand(100)) + 155;
    const g = Math.floor(rand(100)) + 155;
    const b = Math.floor(rand(100)) + 155;

    return `rgb(${r},${g},${b})`;
  }

  private randomPosition(): [number, number] {
    const x = rand.floatBetween(0, this.width - this.nodeRadius * 2) + this.nodeRadius;
    const y = rand.floatBetween(0, this.height - this.nodeRadius * 2) + this.nodeRadius;
    return [x, y];
  }

  public drawGraph(graph: Graph<T>): GraphDrawer<T> {
    // draw nodes
    const nodePositions: Map<GNode<T>, [number, number]> = new Map();
    graph.getNodes().forEach((node) => {
      const [x, y] = this.randomPosition();
      nodePositions.set(node, [x, y]);
    });

    // draw edges
    graph.getNodes().forEach((node) => {
      const [x, y] = nodePositions.get(node) || [0, 0];
      node.getNeighbors().forEach((neighbor) => {
        const [x2, y2] = nodePositions.get(neighbor) || [0, 0];
        this.drawEdges(x, y, x2, y2);
      });
    });

    // draw nodes
    graph.getNodes().forEach((node) => {
      const [x, y] = nodePositions.get(node) || [0, 0];
      this.drawNode(node, x, y);
    });

    return this;
  }

  private drawNode(node: GNode<T>, x: number, y: number) {
    // Draw node, a circle with text inside
    const circle = this.roughSVG.circle(x, y, this.nodeRadius * 2, {
      fill: this.randomColor(),
      fillStyle: "solid",
      strokeWidth: 1,
      roughness: 1,
    });
    this.svgNode.appendChild(circle);

    // draw text
    const elem = this.document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
    );
    elem.setAttribute("x", x.toString());
    elem.setAttribute("y", y.toString());
    elem.setAttribute("text-anchor", "middle");
    elem.setAttribute("alignment-baseline", "middle");
    elem.setAttribute("font-size", "20px");
    elem.setAttribute("font-family", "sans-serif");
    elem.setAttribute("fill", "black");
    elem.textContent = node.data as string;
    this.svgNode.appendChild(elem);
  }

  private drawEdges(x: number, y: number, x2: number, y2: number) {
    // Draw edges
    const line = this.roughSVG.line(x, y, x2, y2, {
      stroke: this.edgeColor,
      strokeWidth: 1,
      roughness: 1,
    });
    this.svgNode.appendChild(line);
  }

  public save(fileName: string) {
    // write to file
    fs.writeFileSync(fileName, this.getStringData());
  }
  public getStringData(): string {
    // write to string
    const xmlSerializer = new XMLSerializer();
    let xml = xmlSerializer.serializeToString(this.svgNode);
    return xml;
  }
}

export const example = () => {
  // Example usage
  const graph = new Graph<string>();

  // Add nodes
  Array.from(Array(10).keys()).forEach((i) => {
    graph.addNode(i.toString());
  });

  // Add edges
  Array.from(Array(10).keys()).forEach((i) => {
    const node = graph.getNodes()[i];
    const neighbor = graph.getNodes()[(i + 1) % 10];
    graph.addEdge(node.data, neighbor.data);
  });

  Array.from(Array(5).keys()).forEach((i) => {
    const node = graph.getNodes()[i];
    const neighbor = graph.getNodes()[(i + 5) % 10];
    graph.addEdge(node.data, neighbor.data);
  });

  // Draw graph
  new GraphDrawer<string>().drawGraph(graph).save("graph.svg");
};
