import "./Root.css";
import Bubble from "../Bubble/Bubble";
import { api } from "../../AST/data";
import CallTree from "../CallTree/CallTree";
import { TreeCall as json } from "./CallTree";

function Root(): JSX.Element {
  const data = api.body;

  return (
    <div className="d-flex">
      <section>
        <CallTree data={json} />
      </section>
      <section className="code-area">
        <Bubble
          order={0}
          entryPoint={json}
          data={data}
          dataparams={[]}
          id={0}
        />
      </section>
    </div>
  );
}

export default Root;
