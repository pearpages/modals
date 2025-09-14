import { ModalExample } from "@pearpages/modals";
import json from "../../package.json";

function App() {
  return (
    <>
      <h1>@pearpages/modals v{json.version}</h1>
      <ModalExample />
    </>
  );
}

export default App;
