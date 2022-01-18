import React from "react";
import addNew from '../svg/addnew.svg';
import InputBox from "./inputbox";
import { useState, useContext, useEffect, useRef }  from "react";
import NavigationContext from '../typescript/context_navigation';
import routerContext from "../typescript/context_router";
export const ToolBar: React.FC =() => {
    const routers = useContext(routerContext);
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
    
    function router () {
        routers.createDocRouter(true);
    }
    const ShowCreate =()=> {
        if (loginstate.userType === 2) {
        return(
            
            <span className="btntoolbar">
                <img src={addNew} /> 
                <div>Create </div>
            </span>
            
        );
        }
        else {
            return (<></>)
        }
    }
    return (

        <div className="toolbar">
            <div className="tbContainer">
                {/* <div className="searchbar">
                    <InputBox />
                </div>                 */}

                <button className="btntoolbarhidden" onClick ={() => router()}>
                    <ShowCreate />
                </button>




            </div>

        </div>
    )
}

export default ToolBar;