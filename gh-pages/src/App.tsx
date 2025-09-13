import { ContributionHeatmapExample } from "@pearpages/heatmap";
import json from "../../package.json";

function App() {
  return (
    <>
      <h1>Contribution Heatmap v{json.version}</h1>
      <ContributionHeatmapExample />
    </>
  );
}

export default App;
