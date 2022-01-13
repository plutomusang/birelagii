import React, {useEffect, useState} from "react";
import logo from '../svg/logo.svg';
import documentType from '../svg/documentType2.svg';
import recepient from '../svg/recepient2.svg';
import report from '../svg/report2.svg';
import {Link, useNavigate } from "react-router-dom";
import logger from "../config/logger";
import { IloginState } from "../page/login";

export interface IHeaderProps {
    logout:()=>{} |void
    onWorkBench:()=>{} |void
    onSession: boolean
}


export const HeaderAB: React.FC<IHeaderProps> =(props) => {
    const navigate = useNavigate();
    const [chkAdd, chkAddSet] = useState(false);
    const onLogOut =()=>{
        document.cookie = 'none';
        const o = document.cookie;  
        logger.info(o);
        props.logout();
        setLogin(getCookie());
        // navigate("/logout");


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
    const onWorkbench =()=> {
        // alert('workbench');
        chkAddSet(false);
        props.onWorkBench();
    }    
    const [loginstate, setLogin] = useState(getCookie());
    const CheckLoginState =() => {
        if (loginstate.LoginStatus === "Success") {
            return (
                <ul>    
                    <li> <img className="hIcon" src={recepient} /><a>Workbench</a></li>                                        
                    <li onClick={onLogOut}> <img className="hIcon"src={documentType} /><a>Logout</a></li>  
                    <li> <a>Welcome {loginstate.Name} </a></li>  
                </ul>
            );
        }
        else {
            return (<></>);
        }
    }
    const onLabelClicked =()=> {
        chkAddSet(!chkAdd);
    }
    useEffect(()=>{
        setLogin(getCookie());
      },[props]);
    return (
        <header className="headerclass">
            <div className="headerContainer">
                <input type="checkbox" id="nav-toggle" className="nav-toggle" checked={chkAdd}/>
                
                <label htmlFor="nav-toggle" className = "nav-toggle-label"> 
                <span onClick={onLabelClicked}  className="label-span"></span> 
                </label>

                <div className="logo">
                    <div className="brmsLogoContainer">
                        <div className="brmsTitle"> 
                            <h1> eLAgii </h1>
                            <img  src={logo} />
                            <div className="subtitle"> 
                                <span> E</span>
                                <span className="subtext">ctronic</span> 
                                <span> L</span>
                                <span className="subtext">cal</span> 
                                <span> A</span>
                                <span className="subtext">ccess for</span>                                 
                                <span> G</span>
                                <span className="subtext">eneration and</span> 
                                <span> I</span>
                                <span className="subtext">nteractive</span>
                                <span> I</span>
                                <span className="subtext">nformation</span>
                            </div>
                        </div> 
                    </div>
                </div>
                


                <nav> 
                    <CheckLoginState />
                </nav>
                
            </div>
        </header>
    )
}
export default HeaderAB;