import { example as exampleEdge } from "./entities/edge";
import { example as exampleGraph } from "./entities/graph";
import { example as exampleNode } from "./entities/node";
import {
  example as exampleGraphDrawer,
  GraphDrawer,
} from "./entities/graph-drawer";
import {
  example as exampleGraphLoader,
  GraphLoader,
} from "./entities/graph-loader";
import {
  example as exampleKruskalAlgorithm,
  KruskalAlgorithm,
} from "./entities/kruskal-algorithm";
import {
  example as examplePrimAlgorithm,
  PrimAlgorithm,
} from "./entities/prim-algorithm";

// get run parameters
const args = process.argv.slice(2); // remove first two arguments (node and index.js)

//if has -debug flag, run example code
if (args.includes("-debug")) {
  try {
    exampleEdge();
    exampleNode();
    exampleGraph();

    exampleKruskalAlgorithm();
    examplePrimAlgorithm();

    exampleGraphDrawer();
    exampleGraphLoader();
  } catch (error) {
    console.log(`Error running example code: ${error}`);
    process.exit(1);
  }
  // exit process
  process.exit(0);
}

//if has -file get provided file path
if (args.includes("-file")) {
  const filePath = args[args.indexOf("-file") + 1];
  const graphLoader = new GraphLoader();

  const seedIndex = args.indexOf("-seed");
  let seed = "undefined";
  if (seedIndex !== -1) {
    seed = args[seedIndex + 1];
  }

  try {
    const loadedGraph = graphLoader.loadFromFile(filePath);
    console.log(`Successfully loaded graph from file ${filePath}`);

    console.log(loadedGraph.edgesString());

    let path = `${filePath.split("/")[filePath.split("/").length - 1]}-${
      new Date().toISOString().split("T")[0]
    }.svg`;
    new GraphDrawer<string>(1000, 1000, seed).drawGraph(loadedGraph).save(path);
    console.log(`Saved graph to ${path}`);

    console.log("Kruskal MST:");
    const kruskalAlgorithm = new KruskalAlgorithm<string>();
    const kruskalMST = kruskalAlgorithm.kruskalMST(loadedGraph);
    new GraphDrawer<string>(1000, 1000, seed)
      .drawGraph(kruskalMST)
      .save("kruskal-" + path);
    console.log(kruskalMST.edgesString());
    console.log(`Saved graph to kruskal-${path}`);

    console.log("Prim MST:");
    const primAlgorithm = new PrimAlgorithm<string>();
    const primMST = primAlgorithm.primMST(loadedGraph);
    new GraphDrawer<string>(1000, 1000, seed)
      .drawGraph(primMST)
      .save("prim-" + path);
    console.log(primMST.edgesString());
    console.log(`Saved graph to prim-${path}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
  process.exit(0);
}

//else print help
console.log(`
Usage: node index.js [options]

Options:
    -debug      Run example code
    -file       Provide file path to load graph from
    -help       Print help
`);
if (args.includes("-help")) {
  process.exit(0);
} else {
  process.exit(1);
}
