import delivery from "../svg/delivery.svg"
import sdelivery from "../svg/delivery_a.svg";

import idea from "../svg/idea.svg"
import sidea from "../svg/idea_a.svg"

import process from "../svg/process.svg"
import sprocess from "../svg/process_a.svg"

import run from "../svg/run.svg"
import srun from "../svg/run_a.svg"

import document from "../svg/document.svg"
import sdocument from "../svg/document_a.svg";

import transmittal from "../svg/transmittal.svg"
import stransmittal from "../svg/transmittal_a.svg";

import project from "../svg/project.svg"
import sproject from "../svg/idea_a.svg";

import icondefault from "../svg/default.svg"
import sicondefault from "../svg/default.svg"

import brms from "../svg/brms.svg"
import sbrms from "../svg/brms_a.svg"

import bms from "../svg/bms.svg"
import sbms from "../svg/bms_a.svg"

import shakehand from "../svg/shakehand.svg"
import sShakehand from "../svg/shakehand_a.svg"

import agenda from "../svg/agenda.svg"
import sAgenda from "../svg/agenda_a.svg"

export const iconIndex =(index:number)=> {
    return  DEF_ICONS.length < index ? 8: index;
}
export const icon =(index:number) => {
    return DEF_ICONS[iconIndex(index)];
}
export const iconSmall =(index:number) => {
    return DEF_ICONSSM[iconIndex(index)];
}
export const DEF_ICONSSM=  [undefined         ,sdocument, stransmittal       , sproject  , srun      , sidea           ,sprocess       , sdelivery        ,sicondefault, sbrms, sbms, sShakehand, sAgenda];
export const DEF_ICONS =   [undefined         ,document , transmittal        , project   , run       , idea            ,process        , delivery         ,icondefault, brms, sbms, shakehand, agenda];
export const DEF_DOCTYPE = ['Track New Record', 'ARO'   , 'Letter of Request', 'Incoming', 'Outgoing', 'Project Design','Sports Design', 'Training Design','', 'BRMS', 'BMS', 'LFC Agenda'];