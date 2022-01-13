import logger from "../config/logger";
import {ITimelineChild, IDocument} from "./interface_SPGetTimeline";
export interface Iapi {
    url: string,
    key: string
}
export const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
};
export const api: Iapi = {
    url: "https://gateway.wizardgizmo.com/api/ProcessRequest",
    key: "Mercury3356Lorreignmay29"
}
export const Remoteapi: Iapi = {
    url: "http://124.107.36.66/api/ProcessRequest",
    key: "Mercury3356Lorreignmay29"
}
export const Localeapi: Iapi = {
    url: "https://gateway.wizardgizmo.com/api/ProcessRequest",
    key: "Mercury3356Lorreignmay29"
}
export default class API{ 
    private useLocal: boolean = true;
    private apiUrl: string = this.useLocal? Localeapi.url : Remoteapi.url;

    public  factory =():string => {
        return this.apiUrl + '?key=' + api.key; 
    }
    //public  factory =():string => api.url + '?key=' + api.key ;

    public URLspDocView =(id:any):string => {
        let param = "&procedurename=spDocView&id=" + id;
        
        return this.factory() + param;
    }
    public URLSetDtTable =(timestamp:number, sqldt: string, jsDT_divide_onethou:number):string => { 

        let s: string;
        s = '&procedurename=spSetDTTable';
        s +=  '&jsDT=' + timestamp;
        s +=  '&sDT=' + sqldt;
        s +=  '&jsDT_divide_onethou=' + jsDT_divide_onethou;

        return this.factory() + s;
    }
    public URLGetTimeline =(id:number):string => { 
        let param = "&procedurename=spGetTimeline&DocumentTrackID=" + id;
        // logger.info( this.factory() + param);
        return this.factory() + param;
    }
    public URLDeleteDocumentTrack = (DocumentTrackID:number) : string => {
        /*
        https://localhost:44331/api/ProcessRequest?
        key=Mercury3356Lorreignmay29
        &procedurename=spDeleteTimeline
        &TimelineID=0&DocumentTrackID=0
        */

        let s: string;
        s = '&procedurename=spDeleteDocumentTrack';
        s +=  '&DocumentTrackID=' + DocumentTrackID;

        return this.factory() + s;;
        
    }

    public URLDeleteTimeline = (TimelineId:number, documentTrackID: number) : string => {
        /*
        https://localhost:44331/api/ProcessRequest?
        key=Mercury3356Lorreignmay29
        &procedurename=spDeleteTimeline
        &TimelineID=0&DocumentTrackID=0
        */

        let s: string;
        s = '&procedurename=spDeleteTimeline';
        s +=  '&TimelineID=' + TimelineId;
        s +=  '&DocumentTrackID=' + documentTrackID;

        return this.factory() + s;;

    }
    public URLSetDocument = (o:IDocument) : string => {
        /*
        https://localhost:44331/api/ProcessRequest?key=Mercury3356Lorreignmay29
        &procedurename=spSetDocumentTrack
        &DocumentTrackID=6
        &DocTypeID=2
        &Subject=New data Juan
        &Office=COA
        &ProjectCode=23234-2
        &Amount=632422
        &Remarks=MOOE
        &Recepient=Juan De la Cruz
        */
        let s: string;
        s = "&procedurename=spSetDocumentTrack";
        s+= "&DocumentTrackID=" + o.DocumentTrackID;
        s+= "&DocTypeID=" + o.DocTypeID;
        s+= "&Subject=" + o.Subject;
        s+= "&Office=" + o.Office;
        s+= "&ProjectCode=" + o.ProjectCode;
        s+= "&Amount=" + o.Amount;
        s+= "&Remarks=" + o.Remarks;
        s+= "&Recepient=" + o.Recepient;
        s+= "&isActed=" + o.isActed;
        s+= "&jsDT=" + Date.now();

        return this.factory() + s;;
    }
    public URLSetTimeline =(o:ITimelineChild): string => {
        /*
        https://localhost:44331/api/ProcessRequest?key=Mercury3356Lorreignmay29
        &procedurename=spSetTimeline
        &TimelineID=11
        &documentTrackId=4
        &personName=Quita Jin kik
        &description=Lorem kiki kokok jaojom kiliki
        &documentStatus=0
        &isLastItem=1
        &delay=0
        &datePaused=0
        &paused=0
        &running=0
        &dateStart=0
        &IndexNumber=1
        */
       let s: string;
       s = '&procedurename=spSetTimeline';
       s +=  '&TimelineID=' + o.TimelineID;
       s +=  '&documentTrackId=' + o.documentTrackId;
       s +=  '&personName=' + o.personName;
       s +=  '&description=' + o.description;
       s +=  '&documentStatus=' + o.documentStatus;
       s +=  '&isLastItem=' + o.isLastItem;
       s +=  '&delay=' + o.delay;
       s +=  '&datePaused=' + o.datePaused;
       s +=  '&paused=' + o.paused;
       s +=  '&running=' + o.running;
       s +=  '&dateStart=' + o.dateStart;
       s +=  '&IndexNumber=' + o.IndexNumber;
       s +=  '&runningDelay=' + o.runningDelay;
       s +=  '&totalTime=' + o.totalTime;
       s +=  '&consumedTime=' + o.consumedTime;
       s +=  '&timeReleased=' + o.timeReleased;
       s +=  '&jsDT=' + Date.now();



        return this.factory() + s;
    }

    private componentDidMount= () =>{
        // POST request using fetch with error handling
        // alert("calling post");
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ title: 'React POST Request Example' })
        // };
        // fetch('https://localhost:44331/api/ExecutePost', requestOptions)
        //     .then(async response => {
        //         const isJson = response.headers.get('content-type')?.includes('application/json');
        //         const data = isJson && await response.json();
    
        //         // check for error response
        //         if (!response.ok) {
        //             // get error message from body or default to response status
        //             const error = (data && data.message) || response.status;
        //             return Promise.reject(error);
        //         }
    
        //         // this.setState({ postId: data.id })
        //     })
        //     .catch(error => {
        //         // this.setState({ errorMessage: error.toString() });
        //         alert(error);
        //         console.error('There was an error!', error);
        //     });
        }
    
    
}
