import { useState, useContext, useCallback , useRef }  from "react";
import React from "react";
import "../sass/main.scss"

import TimerBT, {ItimerData} from "./timerBT";
import NavigationContext from '../typescript/context_navigation';
import TimelineContext from '../typescript/context_SPGetTimeline';
import {DEF_DOCUMENTHEADER, ISPGetTimeline, ITimelineChild} from "../typescript/interface_SPGetTimeline";
import routerContext from "../typescript/context_router";
import logger from "../config/logger";

export const TimeLineAC =() => {
    const TimelineState = useContext(TimelineContext);
    const routers = useContext(routerContext);
    const navigationState = useContext(NavigationContext);
    // const[tm, tmSet] = useState<ISPGetTimeline>(TimelineState);
    const checkaction =():string => {
        if (TimelineState.Set1[0].isActed ) return 'Revert Acttion';
        else return 'Tag as Acted';
    }
    const actCap: string = checkaction();
    const [actedCaption, setActedCaption] = useState(actCap);

    const onCreateTimeline =() => {


        if (!TimelineState.Set1[0].isActed )
        {
            if (navigationState.DocumentTrackID == 0) {
                navigationState.DocumentTrackID = TimelineState.Set1[0].DocumentTrackID;
            }
            
            routers.createTimeLinerouter(true, navigationState.DocumentHeader);
        }
    }
    const onTagActed = () => {
        TimelineState.Set1[0].isActed = !TimelineState.Set1[0].isActed;
        if (TimelineState.Set1[0].isActed ) setActedCaption('Revert Acttion');
        else setActedCaption('Tag as Acted');
        navigationState.DocumentHeader = TimelineState.Set1[0];
        routers.editDocRouter(false, true, navigationState.DocumentHeader );
    }
    const onLocalUpdate =useCallback ((data:ITimelineChild) => {
        // tm.Set2[data.IndexNumber] = data;
        routers.UpdateTimeline(data);

    },[TimelineState]);

    interface ITimelineProps {
        timelineData: ITimelineChild,
        onCreateTimeLine: () => void,
        onLocalUpdate:(data:ITimelineChild) => void
    }
    const TimelineDT: React.FC<ITimelineProps> = React.memo((props) => {
        
        const [values, setData] = useState(props.timelineData);
        let statusColor = values.documentStatus ? "circle" : "circle-alarm";
        let infoClass = values.isLastItem? "infoclass": "infoclass lastline";
    
    
        const onTimerClicked = useCallback ((b:ITimelineChild) => {
            b.documentStatus = b.paused;
            const state = Object.assign ({},b);       
            props.onLocalUpdate(state);
            // setData(state);
          },[])
    
        const TimeZone = ({timelineData}:{timelineData: ITimelineChild}) => {
            if (timelineData.isLastItem && !TimelineState.Set1[0].isActed)
            // return <></>

                return  <TimerBT  timerData={values}   onTimerClicked={onTimerClicked}/>
            else
            return <></>
        }
    
        return (
            <div className="timeline">
                <div className="tl-date"> 
                    <a> {values.timeRecievedCaption}</a>
                </div>                    
                <div className="tl-status">
                    <div className ={statusColor}> </div> 
                    <div className ="circliner"> </div> 
                </div>
                <div className="tl-info">{values.personName} </div>
                <CrudButton timelineData = {values}/> 
    
                <div className="tl-date-rel">  
                    <div>{values.timeReleasedCaption}</div> 
                    <IfDays values={values} />
                    <div className="NoHrs">{values.NoHrsCaption}</div> 
                </div>
                <div className="vliner-container"> <div className="vliner"></div> </div>
    
                <div className={infoClass}>
                    <div>{values.description}</div> 
                    <TimeZone timelineData={values} />
    
                </div>
            </div>
        )
    })
    const IfDays =({values}:{values:ITimelineChild}) => {
        if (values.NoDaysCaption !='' ) return  <div className="NoHrs">{values.NoDaysCaption}</div> 
        else return <></>
    }
    const CrudButton = ({timelineData}: {timelineData:ITimelineChild}) => {
        const navigationState = useContext(NavigationContext);
        navigationState.DocumentTrackID = TimelineState.Set1[0].DocumentTrackID;
        const editTimeLinerouter= () => { 
            routers.editTimeLinerouter(true, false, timelineData);
        };
        const deleteTimelineChildEvent= () => { 
            routers.DeleteTimelineChildEvent(timelineData.TimelineID, timelineData.documentTrackId);
        };    
        return  (
            <div className="buttons">
                <div className="btnedit" onClick ={() => editTimeLinerouter()}>
                    <svg  viewBox="0 0 220 220" className="svgicon" >
                        <polygon  points="0,220 59.34,213.86 6.143,160.661"  />
                        <path  d="M132.018,34.787l53.197,53.197L69.568,203.631L16.37,150.434L132.018,34.787z M212.696,60.502
                            c9.738-9.738,9.742-25.527,0-35.268l-17.93-17.93c-9.738-9.74-25.529-9.738-35.268,0l-17.346,17.347l53.199,53.196L212.696,60.502z
                            " />          
                    </svg>
                </div>
                <div className="btnedit" onClick ={() => deleteTimelineChildEvent()}>
                    <svg className="svgicon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" /></svg>
                </div>        
            </div>
        )
    }
    const svgCross = useRef<any>(null);
    const svgCheck = useRef<any>(null);
    const [bb,sset]= useState(false);
    const clik = () => {
        let b:boolean = !bb;
        sset(b);
        if (b) svgCross.current.beginElement();
        else svgCheck.current.beginElement();

    }
    const CircleActed = () => {
        return (
            <div className="toggleCross">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" width="150" height="150" version="1.1">

                {/* <!--  control element--> */}
                <g>
                    
                    
                    <animate ref={svgCross} id="reverseAnimation" dur="2.0s" attributeName="r" values="100; 100" fill="freeze" />
                    
                </g>

                <g transform="translate(300,0)">
                    <circle cx="100" cy="100" r="100" fill="#e4f8f9"></circle>

                    {/* <!-- vertical line of cross--> */}
                    <path d="M100 50 l0 100" stroke="#2ebdc8" stroke-width="20" stroke-linecap="round">
                    <animate  dur="0.5s" begin="reverseAnimation.begin" attributeName="d" values="M100 150 l50 -100; M100 100 l0 0; M100 50 l0 100" fill="freeze" />
                    <animate  dur="0.5s" begin="startAnimation.begin" attributeName="d" values="M100 50 l0 100; M100 100 l0 0; M100 150 l50 -100" fill="freeze" />
                    
                    </path>

                    {/* <!-- horizontal line of cross --> */}
                    <path d="M50 100 l100 0" stroke="#2ebdc8" stroke-width="20" stroke-linecap="round">
                    <animate  dur="0.5s" begin="reverseAnimation.begin" attributeName="d" values=" M50 100 l50 50; M100 100 l0 0; M50 100 l100 0" fill="freeze" />
                    <animate  dur="0.5s" begin="startAnimation.begin" attributeName="d" values="M50 100 l100 0; M100 100 l0 0; M50 100 l50 50" fill="freeze" />
                    
                    </path>
                </g>
                
                {/* <!--  control element--> */}
                <animate ref={svgCheck} id="startAnimation" dur="2.0s" attributeName="r" values="100; 100" fill="freeze" />
                    

            </svg>

        </div>
        )
    }
    const CircleProcess = () => {
        return (
            <div className="toggleCross">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" width="150" height="150" version="1.1">

                {/* <!--  control element--> */}
                <g>
                    
                {/* <animate ref={svgCheck} id="startAnimation" dur="2.0s" attributeName="r" values="100; 100" fill="freeze" /> */}
                    
                    
                </g>

                <g transform="translate(300,0)">
                    <circle cx="100" cy="100" r="100" fill="#ffd014"></circle>

                    {/* <!-- vertical line of cross--> */}
                    <path d="M100 50 l0 100" stroke="#2ebdc8" stroke-width="20" stroke-linecap="round">
                    <animate  dur="0.5s" begin="startAnimation.begin" attributeName="d" values="M100 50 l0 100; M100 100 l0 0; M100 150 l50 -100" fill="freeze" />    
                    <animate  dur="0.5s" begin="reverseAnimation.begin" attributeName="d" values="M100 150 l50 -100; M100 100 l0 0; M100 50 l0 100" fill="freeze" />

                    
                    </path>

                    {/* <!-- horizontal line of cross --> */}
                    <path d="M50 100 l100 0" stroke="#2ebdc8" stroke-width="20" stroke-linecap="round">
                    <animate  dur="0.5s" begin="startAnimation.begin" attributeName="d" values="M50 100 l100 0; M100 100 l0 0; M50 100 l50 50" fill="freeze" />   
                    <animate  dur="0.5s" begin="reverseAnimation.begin" attributeName="d" values=" M50 100 l50 50; M100 100 l0 0; M50 100 l100 0" fill="freeze" />
                    
                    </path>
                </g>
                
                {/* <!--  control element--> */}
                <animate ref={svgCross} id="reverseAnimation" dur="2.0s" attributeName="r" values="100; 100" fill="freeze" />
                    

            </svg>

        </div>
        )
    }
    const IfonActed = () => {

        if (TimelineState.Set1[0].isActed) return (<CircleActed />)
        else return (<CircleProcess />) 

    }
    
    return (
        <div className="timeline-container" >
            {TimelineState.Set2.map((values) =>{
                return (
                <TimelineDT timelineData={values} onCreateTimeLine={onCreateTimeline} onLocalUpdate={onLocalUpdate}/>
                )
            })}
            <div className="timeline">
                    
                    <div className="tl-date"> 
                        <a></a>
                    </div>
                    <div className="tl-status">
                        <div className="circle-cross"  onClick ={() => onCreateTimeline()}>
                         <IfonActed />   


                        </div>
                        <div className ="circliner"> </div> 


                    </div>
                    <div className="tl-info"></div>
                    <div className="buttons">

                    </div>
                    
                    <div></div>
                    <button className="button-hidden" onClick={()=>onTagActed()}>
                        <span className="button-acted">
                            {actedCaption}
                        </span>
                    </button>
                    <div></div>
                    <div></div>
                    
            </div>
        </div>

    )
}



export default TimeLineAC;