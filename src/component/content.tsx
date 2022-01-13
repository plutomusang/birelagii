import React from "react";
import { useState, useContext }  from "react";
import CreateDoc from "./createDoc";
import DocView from "./docView";
import TimeLineAC from "./timelineAC";
import TimelineHeader from "./timelineHeader";
import NavigationContext from '../typescript/context_navigation';
import CreateTimeline from "./createTimeline";
import logo from '../svg/BudgetLogo.svg';

import {IDocViewEvents, DEF_DOCVIEWEVENTS} from "../typescript/interface_DocView";
export const ContentAB: React.FC =() => {
    const navigationState = useContext(NavigationContext);
    const[Bomb, SetBomb] = useState<IDocViewEvents>(DEF_DOCVIEWEVENTS);

    const Display= () => { 
        return (navigationState.CreateDoc ? <DisplayCreateDoc /> : <DisplayTimeline /> );
    }
    const IFCreateTimeline = () => {
        return (navigationState.CreateTimeline ? <CreateTimeline name="xxx" description="des" documentTrackID={0} OnCreate={false} /> : <TimeLineAC /> );
    }
    const DisplayTimeline= () => { 
        if (navigationState.ViewTimeline) {
            return (
                <div className="timelineContainer">
                    <div className="timelineContainer">
                        <div>
                            <TimelineHeader />    
                        </div>
                        <div>
                            <IFCreateTimeline /> 
                        </div>
                    
                    </div>
                </div>
            )        
        }
        else {
            return (
            <div className="timelineContainer">
                <div className="timelineContainer">
                    <div className="splashContent">
                        <img className="splash" src={logo} />
                    </div>
                </div>
            </div>
            )

        }
    }
    const DisplayCreateDoc= () => { 
        return (

            <div className="createDocContainer">
                 <CreateDoc />
            </div>
        )
    }    
    return (
        <div className="content">
            <div className="wrapper">

                <aside> 
                    <DocView boom={SetBomb}/> 
                </aside>
    
                <Display />

            </div>


        </div>

    )
}

export default ContentAB