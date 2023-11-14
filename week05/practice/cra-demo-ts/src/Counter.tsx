import React,{useState} from "react";
export default function Counter(){
    const[count,setCount]=useState(0)

    function sub(){
        setCount(count-1)
    }

    function add(){
        setCount(count+1)
    }

    return(
        <div>
            <button onClick={()=>{setCount(0)}}>Restart</button>
            <button onClick={add}>Add</button>
            <button onClick={sub}>Sub</button>
            Count:{count}
        </div>
    )
}