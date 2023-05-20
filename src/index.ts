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
import { example as exampleKruskalAlgorithm } from "./entities/kruskal-algorithm";
import { example as examplePrimAlgorithm } from "./entities/prim-algorithm";

// get run parameters

const args = process.argv.slice(2); // remove first two arguments (node and index.js)

// get -seed argument

//if has -debug flag, run example code
if (args.includes("-debug")) {
  exampleEdge();
  exampleNode();
  exampleGraph();

  exampleKruskalAlgorithm();
  examplePrimAlgorithm();

  exampleGraphDrawer();
  exampleGraphLoader();
  // exit process
  process.exit(0);
}

//if has -file get provided file path
if (args.includes("-file")) {
  const filePath = args[args.indexOf("-file") + 1];
  const graphLoader = new GraphLoader();
  const loadedGraph = graphLoader.loadFromFile(filePath);
  console.log(`Successfully loaded graph from file ${filePath}`);

  const seedIndex = args.indexOf("-seed");
  let seed = "undefined";
  if (seedIndex !== -1) {
    seed = args[seedIndex + 1];
  }

  if (loadedGraph) {
    const graphDrawer = new GraphDrawer<string>(1000, 1000, seed);
    const path = `${filePath.split("/")[filePath.split("/").length - 1]}-${
      new Date().toISOString().split("T")[0]
    }.svg`;
    graphDrawer.drawGraph(loadedGraph).save(path);
    console.log(`Successfully saved graph to file ${path}`);
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
process.exit(0);
