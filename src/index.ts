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

const args = process.argv.slice(2);

//if has -debug flag, run example code
if (args.includes("-debug")) {
  exampleEdge();
  exampleNode();
  exampleGraph();
  //exampleGraphDrawer();
  exampleGraphLoader();
  exampleKruskalAlgorithm();
  examplePrimAlgorithm();
  // exit process
  process.exit(0);
}

//if has -file get provided file path
if (args.includes("-file")) {
  const filePath = args[args.indexOf("-file") + 1];
  const graphLoader = new GraphLoader();
  const loadedGraph = graphLoader.loadFromFile(filePath);
  if (loadedGraph) {
    const graphDrawer = new GraphDrawer<string>();
    graphDrawer.drawGraph(loadedGraph).save("graph.svg");
  }
  process.exit(0);
}
