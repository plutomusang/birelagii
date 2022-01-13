
import HeaderAB ,{IHeaderProps}from './component/header';

import { Outlet  } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import "./sass/main.scss";
import {timeparser} from  "./typescript/class_timeUtil";

import API from "./typescript/class_api";
import React, { useEffect, useState }   from "react";
import {jsDateToSQL} from './typescript/class_timeUtil';
import WorkBench from './page/workbench';
import Login, {IloginState} from './page/login';
import logger from './config/logger';



function App() {
  const [session, setSession] = useState(false);
  const [hp, setHP] = useState<IHeaderProps>({
    logout: onLogout,
    onSession: false
  })
  interface IisLogin {
    onlogin:()=>{} |void
}
  const IsLogin: React.FC<IisLogin> =(isprops)=>{

    let o = document.cookie + '';  
    logger.info(document.cookie);
    o = o===''? 'none': o;
    // const o = 'none';  
    // o = 'none';
    let ok = false;
    if (o!='none') {
      let ls: IloginState = JSON.parse(o);
      ok = ls.LoginStatus === 'Success'? true: false;    
    }


    setSession(ok)
    if (ok) {
      return (
        <WorkBench />
      )
    }else {
      return (
        <Login onlogin={isprops.onlogin} />
      )
    }
    

  }
  function onLogout (){
    setSession(false);
  }
  function onLogIn (){
    setSession(true);
  }
  useEffect(()=>{
    // let navigate = useNavigate();
    // navigate("login");
  },[]);
  return (    
    <div className="App">
        <HeaderAB logout={onLogout} onSession={session} />
        <IsLogin onlogin={onLogIn}/>
        {/* <Outlet/> */}

    </div>
  );
}

export default App;

