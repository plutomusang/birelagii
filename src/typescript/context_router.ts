import { createContext } from "react";
import {IRouters, DEF_ROUTERS } from "./interface_routers";

const routerContext = createContext<IRouters>(DEF_ROUTERS)
export default routerContext;