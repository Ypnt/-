interface IProps{
    list:any[];
    OnHideList:()=>void
}

export default function CalcList(props:IProps){
    return(
        <div>
            <ul>
            {
                props.list.map(item=><li>{item.date} : {item.val}</li>)
            }
        </ul>
        <button onClick={props.OnHideList}>Hide List</button>
        </div>
        )
}