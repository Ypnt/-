interface IMessage{
    name:string;
    num:number;
}

export default function HelloMessage(props:IMessage){
    return <div>Hello,{props.name},{props.num}</div>
  }