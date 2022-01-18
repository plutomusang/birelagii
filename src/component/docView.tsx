import React from 'react';

import { useState, useContext, useEffect, useRef }  from "react";
import routerContext from '../typescript/context_router';
import {iconSmall} from '../typescript/class_icons';
import {IDocViewEvents, IDocView, IDocumentView} from "../typescript/interface_DocView";
import DocViewContext from '../typescript/context_DocView';
import logger from '../config/logger';

export const DocView = ({boom} : {boom: React.Dispatch<React.SetStateAction<IDocViewEvents>> }) => {
    const routerctx = useContext(routerContext);
    const { height, width } = useWindowDimensions();


    const dv = useContext(DocViewContext);
    
    const onReload =() => {

    }

    const getCookie =()=> {
        if (IsJsonString(document.cookie)) {
            return JSON.parse(document.cookie);
        } else 
        {
            return(
            {
                "LoginStatus": "none",
                "Name": "",
                "id": 0,
                "userType": 0
            });
        }
    }
    function IsJsonString(str: string):boolean {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }    
    const [loginstate, setLogin] = useState(getCookie());


    function router (id: number) {
        
        routerctx.viewTimeLineRouter(id);
    }
    const trigger =()=> {
        // spDocView();
        // boom({ReloadAll:trigger})
    }

    const GetUserView =() =>{
        if (loginstate.userType === 1) {
            return (
            <div className="docView"> 
                <div className="headerpart"> Inbox </div>    
                <div className="contentpart">
                    {dv.Set3.map((values) => {
                        
                        return (
                            <div key={values.DocumentTrackID} className="recordlist" onClick ={() => router(values.DocumentTrackID)}>
                                <div ><img className="docIcon" src={iconSmall(values.picIndex)} alt="" /> </div>
                                <div className="fld"> {values.taxPayerName}</div>
                                {/* <div className="fld">{values.Subject }</div> */}
                                {/* <div className="fld">{values.personName }</div> */}
                                {/* <div className="fld">{values.NoDays}</div>            */}
                            </div>  
                        )
                    })}   
                </div>           
            </div>
            );
        }
        else if (loginstate.userType === 2) {
            return (
            <div className="docView"> 
                <div className="headerpart"> Inbox </div>    
                <div className="contentpart">
                    {dv.Set3.map((values) => {
                        
                        return (
                            <div key={values.DocumentTrackID} className="recordlist" onClick ={() => router(values.DocumentTrackID)}>
                                <div ><img className="docIcon" src={iconSmall(values.picIndex)} alt="" /> </div>
                                <div className="fld"> {values.taxPayerName}</div>
                                {/* <div className="fld">{values.Subject }</div> */}
                                {/* <div className="fld">{values.personName }</div> */}
                                {/* <div className="fld">{values.NoDays}</div>            */}
                            </div>  
                        )
                    })}   
                </div>    
                
                <div className="headerpart headeracted"> Open Case </div>
                <div className="contentpart">
                    {dv.Set1.map((values) => {
                        
                        return (
                            <div key={values.DocumentTrackID} className="recordlist" onClick ={() => router(values.DocumentTrackID)}>
                                <div ><img className="docIcon" src={iconSmall(values.picIndex)} alt="" /> </div>
                                <div className="fld"> {values.taxPayerName}</div>
                                {/* <div className="fld">{values.Subject }</div> */}
                                {/* <div className="fld">{values.personName }</div> */}
                                {/* <div className="fld">{values.NoDays}</div>            */}
                            </div>  
                        )
                    })}                    
                </div>
                <div className="headerpart headeracted"> Closed Case </div>
                <div className="contentpart">
                    {dv.Set2.map((values) => {
                        return (
                            <div key={values.DocumentTrackID} className="recordlist" onClick ={() => router(values.DocumentTrackID)}>
                                <div ><img className="docIcon" src={iconSmall(values.picIndex)} alt="" /> </div>
                                <div className="fld"> {values.taxPayerName}</div>
                                {/* <div className="fld">{values.Subject}</div> */}
                                {/* <div className="fld">{values.personName }</div> */}
                                {/* <div className="fld">{values.NoDays}</div>            */}
                            </div>  
                        )
                    })} 
                      
                </div>            
            </div>
            );
        }
        else {
            return (<></>);
        }        
    }
    useEffect(() => {
        boom({ReloadAll:trigger})
        setLogin(getCookie());
        //alert(dv.Set1[1].ControlNumber);
        // spDocView();
        
    }, []);
    return (
        <GetUserView />        
    )
} 

function getWindowDimensions() {
    const { 
        innerWidth: width, 
        innerHeight: height 
    } = window;
    return {
      width,
      height
    };
  }
  
export  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
}



export default DocView;
