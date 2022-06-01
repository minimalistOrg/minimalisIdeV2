import {useRef, useState } from "react";
import ReactModal from "react-modal";
import IcoClose from "../../CodeBlock/IcoClose";
import "./LoadCode.css";

function LoadCode(props: any) {
  const code = useRef<any>(null);

  const [textValidURL, setTextValidURL] = useState("");
  const [enablebtn, setEnablebtn] = useState(false);
  const [btnload, setBtnload] = useState("Load");
  const [result, setResult] = useState("");

  async function loadCodeTreeSitter() {
    // props.load(code.current.value, { reset: true });
    const value = code.current.value;
    const regexid = /([\w\d]+)/g;
    const allvalues = value.match(regexid);
    const id = allvalues[allvalues.length - 1];
    setBtnload("Wait...");
    setEnablebtn(false);
    setResult("Loading...");
    const readGist = await getCode(id);
    setBtnload("Load");
    setEnablebtn(true);
    const files: any = Object.values(readGist.files);
    if (files.length === 1 && files[0].language === "JavaScript") {
      props.load(files[0].content, { reset: true });
      setResult("successful upload");
    } else {
      console.error("error gits not is one file or the file not is JavaScript");
      setResult("error loading code");
    }
    // console.log(files);
  }

  const getCode = async (id: any) => {
    let response = await fetch(
      `https://api.github.com/gists/${id}?gist_id=${id}`
    );
    let data = response.json();
    return data;
  };

  function validURL(event: any) {
    const regex = /(https:\/\/gist.github.com\/[\w\d]+\/[\w\d]+\/?)/g;
    const evaluation = regex.test(event.target.value);
    console.log(evaluation);
    if (evaluation) {
      setTextValidURL("");
      setEnablebtn(true);
    } else {
      setTextValidURL("URL Incorrect");
      setEnablebtn(false);
    }
  }


  return (
    <ReactModal
      isOpen={props.isOpen}
      className="LoadCode__Modal"
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      shouldFocusAfterRender={true}
      shouldCloseOnEsc={true}
    >
      <div className="LoadCode__header">
        <div>
          <span>Load Code from a Gist</span>
        </div>
        <div>
          <button title="Close" onClick={() => props.event.gist()}>
            <IcoClose />
          </button>
        </div>
      </div>
      <div className="LoadCode">
        <h3 style={{ margin: "0px" }}>{result}</h3>
        <input
          ref={code}
          type="text"
          className="LoadCode__input"
          placeholder="https://gist.github.com/.../..."
          onChange={validURL}
        />
        <div>
          <span className="text-error">{textValidURL}</span>
        </div>
        <div>
          <button
            className="LoadCode__btn"
            onClick={loadCodeTreeSitter}
            disabled={!enablebtn}
          >
            {btnload}
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

export default LoadCode;
