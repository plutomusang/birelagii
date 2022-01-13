export interface IpopUp {
    classname: string;
    message:  string;
    id: number;
    returnFuntion: (ok:boolean, id:number) => {}| void | undefined;
}
export default IpopUp;