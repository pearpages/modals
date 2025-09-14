import { ModalExample } from "@pearpages/modals";
import json from "../../package.json";

function App() {
  return (
    <>
      <h1>Contribution Modals v{json.version}</h1>
      <ModalExample />
    </>
  );
}

export default App;
