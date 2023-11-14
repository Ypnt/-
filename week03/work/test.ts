class leftItem{
    public _title:string;
    public _tagNames:string[];
    public _diggCount:number;
    public _commentCount:number;
    public _articleId:number;
    public _time:number;
    constructor(time:number,title:string,tagNames:string[],diggCount:number,commentCount:number,articleId:number){
        this._time=time;
        this._title=title;
        this._tagNames=tagNames;
        this._diggCount=diggCount;
        this._commentCount=commentCount;
        this._articleId=articleId;
    }
}
class rightItem{
    public _id:string;
    public _description:string;
    public _lang:string;
    public _starCount:number;
    public _forkCount:number;
    public _url:string;
    public _langColor:string;
    constructor(description:string,lang:string,starCount:number,forkCount:number,url:string,langColor:string){
        this._description=description;
        this._lang=lang;
        this._starCount=starCount;
        this._forkCount=forkCount;
        this._url=url;
        this._langColor=langColor;
        this._id=url.substring("https://github/.com".length);
    }
}

function numString(num:number):string{
    if(num<1000)return num.toString()
    if(num>1000 && num<10000){
        return Math.trunc(num/1000).toString()+"K+"
    }
    else return Math.trunc(num/10000).toString()+"W+"
}
function numDate(num:number):string{
    var time:number=new Date().getTime()
    time=Math.floor(time/1000)
    time=time-num
    var minute:number=Math.ceil(time/(60))
    var hour:number=Math.ceil(time/(60*60))
    var day:number=Math.ceil(time/(60*60*24))
    var month:number=Math.ceil(time/(60*60*24*30))
    var year:number=Math.ceil(time/(60*60*24*30*12))
    if(minute<60)return minute.toString()+"分钟前"
    if(hour<24)return hour.toString()+"小时前"
    if(day<30)return day.toString()+"天前"
    if(month<12)return month.toString()+"月前"
    return year.toString()+"年前"
}

// 左数据
// 推荐url: https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587
// body: {"limit":20,"client_type":6587,"cursor":"0","id_type":2,"cate_id":"6809637767543259144","sort_type":200}
// 最新url：https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587
// body: {"limit":20,"client_type":6587,"cursor":"0","id_type":2,"cate_id":"6809637767543259144","sort_type":300}
function getLeftData(path:string,b:Map<string,any>):any{
    return fetch(path,{
                method:"POST",
                headers:{"content-type": "application/json"},
                body:JSON.stringify(b)
            }) // 返回一个Promise对象
            .then(response => response.json())
            .then(data=> {
                if(document.querySelector(".left .type span")?.innerHTML=="综合"){
                    data=data.data
                    var items:leftItem[]=new Array(data.length);
                    for(var i:number=0;i<data.length;i++){
                        var tags:string[]=new Array(data[i]["item_info"]["tags"].length);
                        for(var j:number=0;j<data[i]["item_info"]["tags"].length;j++){
                            tags[j]=data[i]["item_info"]["tags"][j]["tag_name"];
                        }
                        items[i]=new leftItem(data[i]["item_info"]["article_info"]["rtime"],data[i]["item_info"]["article_info"]["title"],tags,data[i]["item_info"]["article_info"]["digg_count"],data[i]["item_info"]["article_info"]["comment_count"],data[i]["item_info"]["article_id"]);
                    }
                    return items;
                }
                else{
                    data=data.data
                    var items:leftItem[]=new Array(data.length);
                    for(var i:number=0;i<data.length;i++){
                        var tags:string[]=new Array(data[i]["tags"].length);
                        for(var j:number=0;j<data[i]["tags"].length;j++){
                            tags[j]=data[i]["tags"][j]["tag_name"];
                        }
                        items[i]=new leftItem(data[i]["article_info"]["rtime"],data[i]["article_info"]["title"],tags,data[i]["article_info"]["digg_count"],data[i]["article_info"]["comment_count"],data[i]["article_id"]);
                    }
                    return items;
                }
            }) 
}

// 构造左边
function buildLeft(path:string,b:Map<string,any>){
    getLeftData(path,b)
    .then(data=>{
        var dataL:HTMLDivElement|null=document.querySelector(".dataL")
        while(dataL?.firstChild){
            dataL.firstChild.remove()
          }
        for(var i:number=0;i<data.length;i++){
            let li:HTMLLIElement=document.createElement("li")
            let a:HTMLAnchorElement=document.createElement("a")
            a.href="https://juejin.cn/post/"+data[i]._articleId;
            a.target="_blank"
            // 构造数据盒子
            let div:HTMLDivElement=document.createElement("div")
            div.className="box"
            // 上盒子
            let divUp:HTMLDivElement=document.createElement("div")
            divUp.className="divUp"
            divUp.innerText=data[i]._title
            // 下盒子
            let divDown:HTMLDivElement=document.createElement("div")
            divDown.className="divDown"
            let divDownL:HTMLDivElement=document.createElement("div")
            divDownL.className="divDownL"
            let divDownR:HTMLDivElement=document.createElement("div")
            divDownR.className="divDownR"
            for(var j:number=0;j<data[i]._tagNames.length;j++){
                let divTag:HTMLDivElement=document.createElement("div")
                divTag.className="divTag"
                divTag.innerText=data[i]._tagNames[j]
                divDownL.appendChild(divTag)
                if(j==1)break;
                if(j!=data[i]._tagNames.length-1){
                    let divDot:HTMLDivElement=document.createElement("div")
                    divDot.className="divDot"
                    divDownL.appendChild(divDot)
                }
            }
            let divTime:HTMLDivElement=document.createElement("div")
            divTime.className="divTime divTag";
            divTime.innerText=numDate(data[i]._time)
            divDownL.appendChild(divTime)
            let divDig:HTMLDivElement=document.createElement("div")
            divDig.className="divTag"
            divDig.innerText="赞 "+data[i]._diggCount
            let divComment:HTMLDivElement=document.createElement("div")
            divComment.className="divTag"
            divComment.innerText="评论 "+data[i]._commentCount
            let divDot:HTMLDivElement=document.createElement("div")
            divDot.className="divDot"
            divDownR.appendChild(divDig)
            divDownR.appendChild(divDot)
            divDownR.appendChild(divComment)
            divDown.appendChild(divDownL)
            divDown.appendChild(divDownR)
            div.appendChild(divUp)
            div.appendChild(divDown)
            a.appendChild(div)
            li.appendChild(a)
            dataL?.appendChild(li)
        }
    })
}

// 右数据
// url: https://e.juejin.cn/resources/github
function getRightData(path:string,b:Map<string,any>):any{
    return fetch(path,{
                method:"POST",
                headers:{"content-type": "application/json",},
                body:JSON.stringify(b)
            }) // 返回一个Promise对象
            .then(response => response.json())
            .then(data=> {
                console.log(data.data)
                data=data.data
                var items:rightItem[]=new Array(data.length);
                for(var i:number=0;i<data.length;i++){
                    items[i]=new rightItem(data[i]["description"],data[i]["lang"],data[i]["starCount"],data[i]["forkCount"],data[i]["url"],data[i]["langColor"]);
                }
                return(items)
            }) 
}
// 构造右边
function buildRight(path:string,b:Map<string,any>){
    getRightData(path,b)
    .then(data=>{
        console.log(data)
        var dataR=document.querySelector(".dataR")
        while(dataR?.firstChild){
            dataR.firstChild.remove()
          }
        for(var i:number=0;i<data.length;i++){
            let li:HTMLLIElement=document.createElement("li")
            let a:HTMLAnchorElement=document.createElement("a")
            a.href=data[i]._url;
            a.target="_blank"
            // 构造数据盒子
            let div:HTMLDivElement=document.createElement("div")
            div.className="box"
            // 上盒子
            let divUp:HTMLDivElement=document.createElement("div")
            divUp.className="divUp"
            divUp.innerText=data[i]._id
            // 中盒子
            var divMid:HTMLDivElement= document.createElement("div");
            divMid.className = "divMid";
            var midText:HTMLDivElement= document.createElement("div");
            midText.className = "midText";
            if(data[i]._description=="")midText.innerText = "No description provided"
            else midText.innerText = data[i]._description;
            divMid.appendChild(midText);
            // 下盒子
            let divDown:HTMLDivElement=document.createElement("div")
            divDown.className="divDown"
            let divStar:HTMLSpanElement=document.createElement("span")
            divStar.innerText=" "+numString(data[i]._starCount)
            divStar.className="divStar"
            let divFork:HTMLSpanElement=document.createElement("span")
            divFork.innerText=" "+numString(data[i]._forkCount)
            divFork.className="divFork"
            let divLang:HTMLSpanElement=document.createElement("span")
            divLang.className="divLang"
            let c:HTMLElement=document.createElement("i")
            c.style.backgroundColor=data[i]._langColor
            let s:HTMLSpanElement=document.createElement("span")
            if (data[i]._lang=="")s.innerText="Other"
            else s.innerText=data[i]._lang
            divLang.appendChild(c)
            divLang.appendChild(s)
            divDown.appendChild(divStar)
            divDown.appendChild(divFork)
            divDown.appendChild(divLang)
            div.appendChild(divUp)
            div.appendChild(divMid)
            div.appendChild(divDown)
            a.appendChild(div)
            li.appendChild(a)
            dataR?.appendChild(li)
        }
    })
}

// 类型选择监听
function addTypeListener(choose:boolean[]){
    document.querySelector(".left .type")?.addEventListener("click",function(){
        let list:HTMLImageElement=document.querySelector(".left .list ")as HTMLImageElement
        let arrow:HTMLImageElement=document.querySelector(".left .arrow ")as HTMLImageElement
        if(choose[0]==false){
            choose[0]=!choose[0]
            list.style.display="block"
            arrow.setAttribute("style","-moz-transform:scaleY(-1);-webkit-transform:scaleY(-1);-o-transform:scaleY(-1);")
        }
        else{
            choose[0]=!choose[0]
            list.style.display="none"
            arrow.setAttribute("style","-moz-transform:scaleY(1);-webkit-transform:scaleY(1);-o-transform:scaleY(1);")
        }
    })
    document.querySelector(".right .one")?.addEventListener("click",function(){
        let list:HTMLImageElement=document.querySelector(".right .one .list")as HTMLImageElement
        let arrow:HTMLImageElement=document.querySelector(".right .one .arrow")as HTMLImageElement
        if(choose[1]==false){
            choose[1]=!choose[1]
            list.style.display="block"
            arrow.setAttribute("style","-moz-transform:scaleY(-1);-webkit-transform:scaleY(-1);-o-transform:scaleY(-1);")
        }
        else{
            choose[1]=!choose[1]
            list.style.display="none"
            arrow.setAttribute("style","-moz-transform:scaleY(1);-webkit-transform:scaleY(1);-o-transform:scaleY(1);")
        }
    })
    document.querySelector(".right .two")?.addEventListener("click",function(){
        let list:HTMLImageElement=document.querySelector(".right .two .list")as HTMLImageElement
        let arrow:HTMLImageElement=document.querySelector(".right .two .arrow ")as HTMLImageElement
        if(choose[2]==false){
            choose[2]=!choose[2]
            list.style.display="block"
            arrow.setAttribute("style","-moz-transform:scaleY(-1);-webkit-transform:scaleY(-1);-o-transform:scaleY(-1);")
        }
        else{
            choose[2]=!choose[2]
            list.style.display="none"
            arrow.setAttribute("style","-moz-transform:scaleY(1);-webkit-transform:scaleY(1);-o-transform:scaleY(1);")
        }
    })
    document.querySelector(".right .three")?.addEventListener("click",function(){
        let list:HTMLImageElement=document.querySelector(".right .three .list")as HTMLImageElement
        let arrow:HTMLImageElement=document.querySelector(".right .three .arrow ")as HTMLImageElement
        if(choose[3]==false){
            choose[3]=!choose[3]
            list.style.display="block"
            arrow.setAttribute("style","-moz-transform:scaleY(-1);-webkit-transform:scaleY(-1);-o-transform:scaleY(-1);")
        }
        else{
            choose[3]=!choose[3]
            list.style.display="none"
            arrow.setAttribute("style","-moz-transform:scaleY(1);-webkit-transform:scaleY(1);-o-transform:scaleY(1);")
        }
    })
}
// 左右数据选择
function lChoose(type:any[]):any{
    if(type[0]=="综合"){
        return ["https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed?uuid=7208477600016336399&aid=6587",{"client_type":6587,"cursor":"0","id_type":2,"limit":20,"sort_type":type[1]}]
    }
    if(type[0]=="前端"){
        return ["https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587",{"limit":20,"client_type":6587,"cursor":"0","id_type":2,"cate_id":"6809637767543259144","sort_type":type[1]}]
    }
    if(type[0]=="后端"){
        return ["https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587",{"limit":20,"client_type":6587,"cursor":"0","id_type":2,"cate_id":"6809637769959178254","sort_type":type[1]}]
    }
    if(type[0]=="Android"){
        return ["https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587",{"limit":20,"client_type":6587,"cursor":"0","id_type":2,"cate_id":"6809635626879549454","sort_type":type[1]}]
    }
    if(type[0]=="iOS"){
        return ["https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587",{"limit":20,"client_type":6587,"cursor":"0","id_type":2,"cate_id":"6809635626661445640","sort_type":type[1]}]
    }
    if(type[0]=="人工智能"){
        return ["https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587",{"limit":20,"client_type":6587,"cursor":"0","id_type":2,"cate_id":"6809637773935378440","sort_type":type[1]}]
    }
    if(type[0]=="阅读"){
        return ["https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587",{"limit":20,"client_type":6587,"cursor":"0","id_type":2,"cate_id":"6809637772874219534","sort_type":type[1]}]
    }
    if(type[0]=="开发工具"){
        return ["https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587",{"limit":20,"client_type":6587,"cursor":"0","id_type":2,"cate_id":"6809637771511070734","sort_type":type[1]}]
    }
    if(type[0]=="代码人生"){
        return["https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587",{"limit":20,"client_type":6587,"cursor":"0","id_type":2,"cate_id":"6809637776263217160","sort_type":type[1]}]
    }
}
function rChoose(type:string[]):any{
    var change:string[]=new Array(3)
    if(type[0]=="热门")change[0]="trending"
    else change[0]="upcome"
    if(type[1]=="今日")change[1]="day";
    if(type[1]=="本周")change[1]="week";
    if(type[1]=="本月")change[1]="month";
    if(type[2]=="所有语言")change[2]="all"
    else change[2]=type[2].toLowerCase()
    return ["https://e.juejin.cn/resources/github",{"category":change[0],"period":change[1],"lang":change[2],"offset":0,"limit":30}]
}
// 列表监听
function addLChooseListener(lType:any[],rType:string[],deg:number){
    document.querySelector(".left .list")?.addEventListener("click",function(event:any){
        lType[0]=event.target.innerText;
        (document.querySelector(".left .type span") as HTMLElement).innerText=event.target.innerText
        var lInfo=lChoose(lType)
        buildLeft(lInfo[0],lInfo[1])
    })
    document.querySelector(".one .list")?.addEventListener("click",function(event:any){
        rType[0]=event.target.innerText;
        (document.querySelector(".one span") as HTMLElement).innerText=event.target.innerText
        var rInfo=rChoose(rType)
        buildRight(rInfo[0],rInfo[1])
    })
    document.querySelector(".two .list")?.addEventListener("click",function(event:any){
        rType[1]=event.target.innerText;
        (document.querySelector(".two span") as HTMLElement).innerText=event.target.innerText
        var rInfo=rChoose(rType)
        buildRight(rInfo[0],rInfo[1])
    })
    document.querySelector(".three .list")?.addEventListener("click",function(event:any){
        rType[2]=event.target.innerText;
        (document.querySelector(".three span") as HTMLElement).innerText=event.target.innerText
        var rInfo=rChoose(rType)
        buildRight(rInfo[0],rInfo[1])
    })
    document.querySelector(".left .active")?.addEventListener("click",function(event:any){
        lType[1]=200;
        (document.querySelector(".left .active span") as HTMLElement).style.color="#1E80FF";
        (document.querySelector(".left .active svg") as HTMLElement).style.fill="#1E80FF";
        (document.querySelector(".left .latest") as HTMLElement).style.color="#4E5969";
        let div=document.querySelector(".left .active svg") as HTMLElement
        deg+=360;
        div.style.transform="rotate("+deg+"deg)"
        var lInfo=lChoose(lType)
        buildLeft(lInfo[0],lInfo[1])
    })
    document.querySelector(".left .latest")?.addEventListener("click",function(event:any){
        lType[1]=300;
        (document.querySelector(".left .active span") as HTMLElement).style.color="#4E5969";
        (document.querySelector(".left .active svg") as HTMLElement).style.fill="#4E5969";
        (document.querySelector(".left .latest") as HTMLElement).style.color="#1E80FF";
        var lInfo=lChoose(lType)
        buildLeft(lInfo[0],lInfo[1])
    })
}

