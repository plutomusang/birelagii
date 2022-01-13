import json_TIMELINE from "../json/api_spGetTimeline.json"
import json_TIMELINECHILD from "../json/def_TimelineChild.json";
import json_DOCUMENTHEADER from "../json/def_TimelineHeader.json"
export const DEF_TIMELINE = json_TIMELINE;
export const DEF_TIMELINECHILD = json_TIMELINECHILD;
export const DEF_DOCUMENTHEADER = Object.assign ({},json_DOCUMENTHEADER);
export const DEF_NEWDOCUMENTHEADER = Object.assign ({},json_DOCUMENTHEADER);

export interface ISPGetTimeline {
    Header: string;
    Set1:   IDocument[];
    Set2:   ITimelineChild[];
}

export interface IDocument {
    DocumentTrackID: number;
    DocTypeID:       number;
    DocType:         string;
    picIndex:        number;
    Subject:         string;
    Office:          string;
    ProjectCode:     string;
    Amount:          number;
    Remarks:         string;
    DateCreated:     string;
    DateCompleted:   string;
    isActed:         boolean;
    ControlNumber:   string;
    Recepient:       string;
    NoDays :         string;
    taxPayerName:    string;
}

export interface ITimelineChild {
    IndexNumber:     number;
    TimelineID:      number;
    documentTrackId: number;
    personName:      string;
    description:     string;
    timeRecieved:    string;
    timeReleased:    string;
    NoHrs:           number;
    documentStatus:  boolean;
    isLastItem:      boolean;
    delay:           number;
    datePaused:      number;
    paused:          boolean;
    running:         boolean;
    dateStart:       number;
    timeRecievedCaption:    string; 
    timeReleasedCaption:    string;
    NoHrsCaption:           string;
    runningDelay:   number;
    totalTime:      number;
    consumedTime:   number;
    NoDaysCaption:  string;
}

