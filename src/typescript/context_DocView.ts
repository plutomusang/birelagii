import { createContext } from "react";
import {IDocumentView,DEF_DOCUMENTVIEW } from "./interface_DocView"


const DocViewContext = createContext<IDocumentView>(DEF_DOCUMENTVIEW);

export default DocViewContext;

