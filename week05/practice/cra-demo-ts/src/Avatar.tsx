interface path{
    path:string
}
export  default function Avatar(props:path){
    return (
        <div>
            <img src={props.path} alt="wps" />
        </div>
    )
}