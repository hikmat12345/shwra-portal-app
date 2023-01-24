import { createElement } from "react";

import DocumentBlock from "./DocumentBlock";
import DocumentTitle from "./DocumentTitle";
import DocumentList from "./DocumentList";


const Components: any = {
  title: DocumentTitle,
  block: DocumentBlock,
  list: DocumentList,
};


export default function layouts( data : any ) {

  if (typeof Components[data.type] !== "undefined") {
    return createElement(Components[data.type], data.data);
  }
  return createElement(
    () => <div>The component {data.type} has not been created yet.</div>,
    { key: data.type }
  );
};



