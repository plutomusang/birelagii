import { ITimelineChild, IDocument} from "./interface_SPGetTimeline"
export const DEF_ROUTERS: IRouters = {
    createDocRouter: (x:boolean) => {},
    createTimeLinerouter: (x:boolean, documentHeader:IDocument) => {},
    editDocRouter: (x:boolean,willSave:boolean, documentHeader:IDocument) => {},
    editTimeLinerouter: (x:boolean,willSave:boolean, timelinechild:ITimelineChild) => {},
    viewTimeLineRouter: (id:number) => {},
    DeleteDocViewEvent: (id:number) => {},
    DeleteTimelineChildEvent: (TimelineId:number, DocumentTrackID: number) => {},
    UpdateTimeline: (Records:ITimelineChild) => {},
    UpdateDocument: (Records:IDocument) => {},
    login: (unm: string, pw: string) => {},
}
export  interface IRouters {
    createDocRouter: (x:boolean) => {} | void,
    createTimeLinerouter: (x:boolean, documentHeader:IDocument) => {} | void,
    editDocRouter: (x:boolean, willSave:boolean, documentHeader:IDocument) => {} | void,
    editTimeLinerouter: (x:boolean, willSave:boolean, timelinechild:ITimelineChild) => {} | void,
    viewTimeLineRouter: (id:number) => {} | void ,
    DeleteDocViewEvent: (id:number) => {} | void , 
    DeleteTimelineChildEvent: (TimelineId:number, DocumentTrackID: number) => {} | void ,
    UpdateTimeline: (Records:ITimelineChild) => {} | void,
    UpdateDocument: (Records:IDocument) => {} | void,
    login: (unm: string, pw: string) => {} | void,
}
