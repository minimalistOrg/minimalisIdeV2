import { ObjTree } from "../../interface";

export let TreeCall: ObjTree[] = [
  // {
  //   id: 0,
  //   name: "main",
  //   params: [{text:"("},{text:")"}],
  //   index: 0,
  //   value: [],
  //   event: false,
  //   order: 0,
  //   element: null,
  //   Bubble: () => {
  //     let result = document.getElementById("id" + 0);
  //     return result;
  //   },
  // },
];

export function resetTreeCall(): void {
  TreeCall = [];
}
