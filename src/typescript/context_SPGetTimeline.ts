import { createContext } from "react";
import {ISPGetTimeline, DEF_TIMELINE} from "./interface_SPGetTimeline"

const TimelineContext = createContext<ISPGetTimeline>(DEF_TIMELINE);

export default TimelineContext;
