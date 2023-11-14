import {useState} from "react"
import CalcList from "./CalcList"
export default function Calc(){
    const[x,setX]=useState(0)
    const[y,setY]=useState(0)
    const[sum,setSum]=useState(0)
    const[hide,setHide]=useState("showList")
    const[list,setList]=useState([] as any[])
    function add(){
        setSum(x+y)
        setList([...list,{date:new Date().toLocaleString(),val:x.toString()+'+'+y.toString()+'='+(x+y).toString()}])
    }

    function OnHideList(){
        hide==="showList"?setHide("hideList") :setHide("showList");
    }

    return(
        <div>
        <input type="text" value={x} onChange={(e)=>{setX(parseInt((e.target as HTMLInputElement).value))}}/>
        <input type="text" value={y} onChange={(e)=>{setY(parseInt((e.target as HTMLInputElement).value))}}/>
        <button onClick={add}>Add</button><br />
        <button onClick={OnHideList}>{hide}</button>
        <p>sum:{sum}</p>
        {
            hide==="showList"?<></>:
                <CalcList list={list} OnHideList={OnHideList}></CalcList>
        }
        </div>
    )
}