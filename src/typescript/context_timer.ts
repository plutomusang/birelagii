import { createContext } from "react";

export const DEF_TIMERSTATE={
    delay:0,
    datePaused: 0,
    paused: false,
    running: false,
    dateStart: Date.now()
}

export type ITimerState = typeof DEF_TIMERSTATE;
const timeContext = createContext<ITimerState>(DEF_TIMERSTATE);

export default timeContext;
