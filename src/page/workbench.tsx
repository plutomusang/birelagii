import { useState, useEffect }   from "react";
import ContentAB from '../component/content';
import ToolBar from '../component/toolbar';

import NavigationContext from '../typescript/context_navigation';


import TimelineContext  from '../typescript/context_SPGetTimeline';
import {ISPGetTimeline, DEF_TIMELINE, ITimelineChild, IDocument} from "../typescript/interface_SPGetTimeline";
import NavigationRouter from "../typescript/class_NavigationRouter";
import API from "../typescript/class_api";
import INavigation, {DEF_NAVIGATION}  from "../typescript/interface_Navigation";
import DocViewContext from "../typescript/context_DocView";
import routerContext from '../typescript/context_router';
import { IDocumentView, DEF_DOCUMENTVIEW} from "../typescript/interface_DocView";
import {IRouters } from '../typescript/interface_routers';
import logger from "../config/logger";
import Popup from "../component/popup";
import IpopUp from "../typescript/interface_popup"
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import "animate.css";
import 'react-notifications-component/dist/theme.css';

const WorkBench =()=> {

  const inav=() => {
    return new NavigationRouter();
  }
  const[routers, SetRouter] = useState<IRouters>({
    createDocRouter: createDocument,
    createTimeLinerouter: createTimeLine,
    editDocRouter: editDoc,
    editTimeLinerouter: editTimeLine,
    viewTimeLineRouter: viewTimeLine,
    DeleteDocViewEvent: DeleteDocViewEvent,
    DeleteTimelineChildEvent: DeleteTimelineChildEvent,
    UpdateTimeline: UpdateTimeline,
    UpdateDocument:  UpdateDocument,
    login: Login,
  });

  const[documentView, SetDocument] = useState<IDocumentView>(DEF_DOCUMENTVIEW);
  const[TimelineData, SetTimeline] = useState<ISPGetTimeline>(DEF_TIMELINE);
  const[navigation, navigationSet] = useState< INavigation>(DEF_NAVIGATION);
  const[logged, setLog] = useState<string>('true');
  // the system will require a cookie
  const [loginstate, setLogin] = useState(JSON.parse(document.cookie));
  
  const[popUpClass, setPop] = useState<IpopUp>({
    classname:"pop-up",
    message:"Continue deleting thie record?",
    id:0,
    returnFuntion: deleteDocument,
  });

  const popOpen=(open:boolean,Header:string, id:number )=>{
    let classname = open? 'pop-up open': 'pop-up';
    let obj:(ok:boolean, id:number)=>{}|void = deleteTimeline;
    if (Header === 'Document') obj = deleteDocument;
    
    setPop({
      classname:classname,
      message:"Continue deleting thie record?",
      id: id,
      returnFuntion: obj,
    });
  }

  // logger.info('workbench has rendered');
  const DisplayNotification =() => {
    store.addNotification({
      title: "Wonderful!",
      message: "teodosii@react-notifications-component",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 10000,
        onScreen: true
      }
    })
  }

  function deleteDocument(ok:boolean, recId:number) {
    let id = recId;
    // logger.info('docemnet deleted ' + id);
    popOpen(false, 'Document', 0)
    
    if (ok) {
      inav().DeleteDocViewEvent(id, navigationSet);
      spDeleteDocumentTrack(id);
    }
  }
  function deleteTimeline(ok:boolean, recId:number) {
    let id = recId;
    // logger.info('Timeline deleted '  + popUpClass.id + ', ' + navigation.DocumentTrackID);
    popOpen(false, 'Timeline', 0)
    
    if (ok) {
      spDeleteTimeline(id, navigation.DocumentTrackID)
    }

  }
  function DeleteDocViewEvent(id:number) {
    popOpen(true, 'Document', id);
  }
  function DeleteTimelineChildEvent(TimelineId:number, DocumentTrackID: number) {
    popOpen(true, 'Timeline', TimelineId);
    navigation.DocumentTrackID = DocumentTrackID;


  }
  function UpdateTimeline(Records:ITimelineChild) {
    
    //SetTimeline(Object.assign ({},Records));
    spSetTimeline(Records);

  }

  function Login(un: string, pw:string) {

    if (un == 'admin' && pw =='admin'){
      setLog('true');
      localStorage.setItem("log", 'true');
      alert('Login');
    }
  }
  function UpdateDocument(Records:IDocument) {
    // alert("calling post");
    //SetTimeline(Object.assign ({},Records));
    // spSetTimeline(Records);
  }



  function viewTimeLine(id:number) {
    inav().viewTimeLine(id, navigationSet);
    spGetTimeline(id);
  }
  function editDoc(x:boolean,willSave:boolean, documentHeader:IDocument) {
    inav().editDoc(x,documentHeader, navigationSet);
    
    if (!x && willSave){

      spSetDocumentTrack(documentHeader);

    }
  }
  function editTimeLine(x:boolean,willSave:boolean, timelinechild:ITimelineChild) {
    inav().editTimeLine(x,timelinechild, navigationSet);    

    if (!x && willSave) {
      
      spSetTimeline(timelinechild);

    }
  }

  function createDocument(x:boolean) {    

    inav().createDocument(x, navigationSet);

  }
  function createTimeLine(x:boolean, documentHeader: IDocument) {
    inav().createTimeLinerouter(x,documentHeader, navigationSet);
  }
  const spDeleteDocumentTrack=async(o:number)=> {
    const api = new API();
    //alert (api.URLSetTimeline(o));

    const response=await fetch(api.URLDeleteDocumentTrack(o) )
    .then((res) => res.json())
    .then((data) => 
    {
      // SetTimeline(data);
      spDocView();
    })
    .catch((err) => {
      alert(err);
    })
  }
  const spDeleteTimeline=async(TimelineId:number, documentTrackID: number)=> {
    const api = new API();
    //alert (api.URLSetTimeline(o));

    const response=await fetch(api.URLDeleteTimeline(TimelineId, documentTrackID) )
    .then((res) => res.json())
    .then((data) => 
    {
       SetTimeline(data);
       spDocView();
    })
    .catch((err) => {
      alert(err);
    })
  }    
  const spSetDocumentTrack=async(o:IDocument)=> {
    const api = new API();
    //alert (api.URLSetTimeline(o));
    // logger.info(api.URLSetDocument(o));
    const response=await fetch(api.URLSetDocument(o) )
    .then((res) => res.json())
    .then((data) => 
    {
      // logger.info(JSON.stringify(data));
      SetTimeline(data);
      // alert('hit');
      spDocView();
    })
    .catch((err) => {
      alert(err);
    })
  }

  const spSetTimeline=async(o:ITimelineChild)=> {
    const api = new API();
    //alert (api.URLSetTimeline(o));

    const response=await fetch(api.URLSetTimeline(o) )
    .then((res) => res.json())
    .then((data) => 
    {
      SetTimeline(data);
      spDocView();
    })
    .catch((err) => {
      alert(err);
    })
  }
  const spGetTimeline=async(id:number)=> {
    const api = new API();
    // alert (api.URLGetTimeline(id));
    const response=await fetch(api.URLGetTimeline(id)).then((res) => res.json()).then((data) => 
      {
        SetTimeline(data);
      })
      .catch((err) => {
        alert(err);
      })
  }
  const spDocView=async()=> {
    const api = new API()
    // logger.info(api.URLspDocView(), 'spDocView');
    const response=await fetch(api.URLspDocView(loginstate.id) )
                        .then((res) => res.json())
                        .then((data) => 
                        {
                          
                            // logger.info(JSON.stringify(data));
                            SetDocument(data);
                          
                          // alert(documentView.Set1[].length)
                        })
                        .catch((err) => {
                          alert(err);
                        })
}
const[ctr, counter]= useState(0)
useEffect(() => {
  counter(ctr + 1)
  spDocView();
}, []);

  const IfContent =()=> {
    if (logged=='true')return  <ContentAB />
    else return <></>
    
  }

  return (
    <routerContext.Provider value = {routers}>
      <NavigationContext.Provider value = {navigation} >
        <ReactNotification />
        {/* <button onClick={DisplayNotification}>default</button> */}
        <Popup {...popUpClass}/>
        <ToolBar />
        
        <DocViewContext.Provider value={documentView}>            
          <TimelineContext.Provider value ={TimelineData}>
            
              {/* <ContentAB /> */}
              
              <IfContent />
          </TimelineContext.Provider>
        </DocViewContext.Provider>
      </NavigationContext.Provider>
    </routerContext.Provider>

  );
}

export default WorkBench;

