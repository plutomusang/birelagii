import React from "react";
import { useState, useContext, useEffect, useRef }  from "react";
import NavigationContext from '../typescript/context_navigation';
import {ISPGetTimeline, ITimelineChild} from "../typescript/interface_SPGetTimeline";
import routerContext from "../typescript/context_router";
import DocViewContext from "../typescript/context_DocView";
import TimelineContext from '../typescript/context_SPGetTimeline';
import Dynalist from "./dynalist";
import API from "../typescript/class_api";

interface ReceiverProps {
    name: string,
    description: string,
    documentTrackID: 0,
    OnCreate: false
}

export const CreateTimeline: React.FC<ReceiverProps> =({name, description}) => {
    const ctx = useContext(NavigationContext);
    const routers = useContext(routerContext);
    const TimelineState = useContext(TimelineContext);
    const docviewCtx = useContext(DocViewContext);
    const personName = ctx.TimeLineChild.personName;
    const mydescription = ctx.TimeLineChild.description;
    const api = new API();
    const [mName, setName] = useState(personName)
    const [mDescription, setDescription] = useState(mydescription)
    
    const[userID, setUserID] = useState(0);
    const onTextChanged =(id:number , data: string)=> {

        setUserID(id);
        setName (data);
    } 

    const editTimeLinerouter= (ok:boolean ) => { 
        ctx.TimeLineChild.documentTrackId = TimelineState.Set1[0].DocumentTrackID;
        if (ok) {
            ctx.TimeLineChild.personName = mName;
            ctx.TimeLineChild.description = mDescription;                        
        }
        routers.editTimeLinerouter(false, ok, ctx.TimeLineChild);

    };


    const onDescriptionChange =(event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription (event.target.value);
    }
    useEffect(() => {
       
    }, []);
    return (
        <div className="createTimeline">
            
            <div className="formCardContainer"> 
                <div className="formCard">
                        <div  className="form-item r1">                    
                            <label htmlFor="">Recepient or a Task Name</label> 
                            <Dynalist 
                                apiGet={api.factory() + "&procedurename=spGetUsers"}
                                apiSet={api.factory() + "&procedurename=spSetUsers&id="}
                                apiDelete={api.factory() + "&procedurename=spDeleteUsers&id="}
                                value={mName}
                                id={userID}
                                header={'Reciever'}
                                onTextChanged={onTextChanged}
                            />                                 
                            {/* <input type="text" className="form-input" placeholder="" defaultValue= { ctx.TimeLineChild.personName}  onChange={onNameChange}/>                         */}
                        </div>
                        <div  className="form-item s1">             
                            <label htmlFor="">Remarts</label>           
                            <textarea className="textarea" placeholder="Enter details here . . . " defaultValue ={ctx.TimeLineChild.description} onChange={onDescriptionChange}/>
                        </div>
                        <button className="cardbutton" onClick={()=>editTimeLinerouter(true)}>
                            <span className="submit">
                                Submit
                            </span>
                         </button>   
                         <button className="cardbutton" onClick={()=>editTimeLinerouter(false)}>
                            <span className="submit">
                                Cancel
                            </span>
                         </button>  
                </div>
            </div>
        </div>

    )

}

export default CreateTimeline;