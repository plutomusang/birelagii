import { createContext } from "react";
import INavigation, {DEF_NAVIGATION} from "./interface_Navigation"

const navigationContext = createContext<INavigation>(DEF_NAVIGATION);

export default navigationContext;
