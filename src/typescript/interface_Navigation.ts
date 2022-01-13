import {DEF_TIMELINECHILD, ITimelineChild, DEF_DOCUMENTHEADER, IDocument} from "./interface_SPGetTimeline"
export const DEF_NAVIGATION: INavigation = {
    ViewTimeline:false,
    CreateDoc:false,
    CreateTimeline:false,
    EditDoc:false,
    EditTimeline:false,    
    DocumentTrackID:0,  
    TimeLineChild: DEF_TIMELINECHILD,
    DocumentHeader: DEF_DOCUMENTHEADER
}
export default interface INavigation {
    ViewTimeline:boolean,
    CreateDoc:boolean,
    CreateTimeline:boolean,
    EditDoc:boolean,
    EditTimeline:boolean,    
    DocumentTrackID:number,  
    TimeLineChild:ITimelineChild,
    DocumentHeader: IDocument
}
