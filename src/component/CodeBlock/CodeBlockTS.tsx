import { useState, useEffect, useRef } from "react";
import ChooseType from "../RenderTreeSitter/ChooseType";
import "./CodeBlock.css";
import IcoClose from "./IcoClose";
import IcoCollapse from "./IcoCollapse";

function CodeBlockTS(props: any): JSX.Element {
  // console.log(props.code, "CodeBlockTS");
  const [title, setTitle] = useState("Loading...");
  const [code, setCode] = useState({ type: "loading", text: "Loading" });
  const [params, setParams] = useState([]);
  const activeBubble = useRef<any>(null);

  useEffect(() => {
    if (!(props.code === undefined)) {
      if (props.code.node.children[3] === undefined) {
        setCode(props.code.node.children[1].children[2].children[2]);
        setTitle(props.code.node.children[1].children[0].text);
        // setID(props.code.node.children[1].children[0].id);
        setParams(props.code.node.children[1].children[2].children[0].children);
        // setParams("1");
      } else {
        setTitle(props.code.node.children[1].text);
        setCode(props.code.node.children[3]);
        setParams(props.code.node.children[2].children);
        // setID(props.code.node.children[1].id)
      // setID(props.call.fninfo.id)
      }
    }

    Object.defineProperty(activeBubble.current, "fninfo", {value: props.data,writable:true})
    //eslint-disable-next-line
  }, [props.code]);

  function fnHover(event: any) {
    let data = event.currentTarget.parentNode.fninfo;
    // console.log(event.currentTarget.parentNode)
    if (!(data.element === null)) {
      data.element.classList.add("CallExpressionHover");
      if (!(data.Bubble() === null)) {
        data.Bubble().classList.add("CodeBlockHover");
      }
    } else {
      event.currentTarget.parentNode.classList.add("CodeBlockHover");
    }
  }

  function fnHoverLeave(event: any) {
    let data = event.currentTarget.parentNode.fninfo;
    if (!(data.element === null)) {
      // console.log(data.element);
      data.element.classList.remove("CallExpressionHover");
      if (!(data.Bubble() === null)) {
        data.Bubble().classList.remove("CodeBlockHover");
      }
    } else {
      event.currentTarget.parentNode.classList.remove("CodeBlockHover");
    }
  }

  // console.log(params);

  return (
    <div id={"id" + props.id} className="CodeBlock" data-testid="Bubble" ref={activeBubble}>
      <div
        className="CodeBlock__header"
        data-testid="BubbleOrder"
        onMouseOver={fnHover}
        onMouseLeave={fnHoverLeave}
      >
        <div className="CodeBlock__title">
          <div className="CodeBlock__collapse">
            <IcoCollapse />
          </div>
          {title}
          <span className="CodeBlock__arguments">
            {" "}
            {params.map((e: any, index: number) => {
              return (
                <span key={index}>
                  <ChooseType info={e} />
                </span>
              );
            })}{" "}
          </span>
        </div>
        <button
          className="CodeBlock__menu"
          data-testid="closeBubble"
          title="Close"
          onClick={props.closeBubble}
        >
          <IcoClose />{" "}
        </button>
      </div>
      <div className="CodeBlock__body" onClick={props.openBubble}>
        <pre>
          <code>
            <ChooseType info={code} />
          </code>
        </pre>
      </div>
    </div>
  );
}

export default CodeBlockTS;
