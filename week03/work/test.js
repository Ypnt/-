var leftItem = /** @class */ (function () {
    function leftItem(time, title, tagNames, diggCount, commentCount, articleId) {
        this._time = time;
        this._title = title;
        this._tagNames = tagNames;
        this._diggCount = diggCount;
        this._commentCount = commentCount;
        this._articleId = articleId;
    }
    return leftItem;
}());
var rightItem = /** @class */ (function () {
    function rightItem(description, lang, starCount, forkCount, url, langColor) {
        this._description = description;
        this._lang = lang;
        this._starCount = starCount;
        this._forkCount = forkCount;
        this._url = url;
        this._langColor = langColor;
        this._id = url.substring("https://github/.com".length);
    }
    return rightItem;
}());
function numString(num) {
    if (num < 1000)
        return num.toString();
    if (num > 1000 && num < 10000) {
        return Math.trunc(num / 1000).toString() + "K+";
    }
    else
        return Math.trunc(num / 10000).toString() + "W+";
}
function numDate(num) {
    var time = new Date().getTime();
    time = Math.floor(time / 1000);
    time = time - num;
    var minute = Math.ceil(time / (60));
    var hour = Math.ceil(time / (60 * 60));
    var day = Math.ceil(time / (60 * 60 * 24));
    var month = Math.ceil(time / (60 * 60 * 24 * 30));
    var year = Math.ceil(time / (60 * 60 * 24 * 30 * 12));
    if (minute < 60)
        return minute.toString() + "分钟前";
    if (hour < 24)
        return hour.toString() + "小时前";
    if (day < 30)
        return day.toString() + "天前";
    if (month < 12)
        return month.toString() + "月前";
    return year.toString() + "年前";
}
// 左数据
// 推荐url: https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587
// body: {"limit":20,"client_type":6587,"cursor":"0","id_type":2,"cate_id":"6809637767543259144","sort_type":200}
// 最新url：https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587
// body: {"limit":20,"client_type":6587,"cursor":"0","id_type":2,"cate_id":"6809637767543259144","sort_type":300}
function getLeftData(path, b) {
    return fetch(path, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(b)
    }) // 返回一个Promise对象
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var _a;
        if (((_a = document.querySelector(".left .type span")) === null || _a === void 0 ? void 0 : _a.innerHTML) == "综合") {
            data = data.data;
            var items = new Array(data.length);
            for (var i = 0; i < data.length; i++) {
                var tags = new Array(data[i]["item_info"]["tags"].length);
                for (var j = 0; j < data[i]["item_info"]["tags"].length; j++) {
                    tags[j] = data[i]["item_info"]["tags"][j]["tag_name"];
                }
                items[i] = new leftItem(data[i]["item_info"]["article_info"]["rtime"], data[i]["item_info"]["article_info"]["title"], tags, data[i]["item_info"]["article_info"]["digg_count"], data[i]["item_info"]["article_info"]["comment_count"], data[i]["item_info"]["article_id"]);
            }
            return items;
        }
        else {
            data = data.data;
            var items = new Array(data.length);
            for (var i = 0; i < data.length; i++) {
                var tags = new Array(data[i]["tags"].length);
                for (var j = 0; j < data[i]["tags"].length; j++) {
                    tags[j] = data[i]["tags"][j]["tag_name"];
                }
                items[i] = new leftItem(data[i]["article_info"]["rtime"], data[i]["article_info"]["title"], tags, data[i]["article_info"]["digg_count"], data[i]["article_info"]["comment_count"], data[i]["article_id"]);
            }
            return items;
        }
    });
}
// 构造左边
function buildLeft(path, b) {
    getLeftData(path, b)
        .then(function (data) {
        var dataL = document.querySelector(".dataL");
        while (dataL === null || dataL === void 0 ? void 0 : dataL.firstChild) {
            dataL.firstChild.remove();
        }
        for (var i = 0; i < data.length; i++) {
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.href = "https://juejin.cn/post/" + data[i]._articleId;
            a.target = "_blank";
            // 构造数据盒子
            var div = document.createElement("div");
            div.className = "box";
            // 上盒子
            var divUp = document.createElement("div");
            divUp.className = "divUp";
            divUp.innerText = data[i]._title;
            // 下盒子
            var divDown = document.createElement("div");
            divDown.className = "divDown";
            var divDownL = document.createElement("div");
            divDownL.className = "divDownL";
            var divDownR = document.createElement("div");
            divDownR.className = "divDownR";
            for (var j = 0; j < data[i]._tagNames.length; j++) {
                var divTag = document.createElement("div");
                divTag.className = "divTag";
                divTag.innerText = data[i]._tagNames[j];
                divDownL.appendChild(divTag);
                if (j == 1)
                    break;
                if (j != data[i]._tagNames.length - 1) {
                    var divDot_1 = document.createElement("div");
                    divDot_1.className = "divDot";
                    divDownL.appendChild(divDot_1);
                }
            }
            var divTime = document.createElement("div");
            divTime.className = "divTime divTag";
            divTime.innerText = numDate(data[i]._time);
            divDownL.appendChild(divTime);
            var divDig = document.createElement("div");
            divDig.className = "divTag";
            divDig.innerText = "赞 " + data[i]._diggCount;
            var divComment = document.createElement("div");
            divComment.className = "divTag";
            divComment.innerText = "评论 " + data[i]._commentCount;
            var divDot = document.createElement("div");
            divDot.className = "divDot";
            divDownR.appendChild(divDig);
            divDownR.appendChild(divDot);
            divDownR.appendChild(divComment);
            divDown.appendChild(divDownL);
            divDown.appendChild(divDownR);
            div.appendChild(divUp);
            div.appendChild(divDown);
            a.appendChild(div);
            li.appendChild(a);
            dataL === null || dataL === void 0 ? void 0 : dataL.appendChild(li);
        }
    });
}
// 右数据
// url: https://e.juejin.cn/resources/github
function getRightData(path, b) {
    return fetch(path, {
        method: "POST",
        headers: { "content-type": "application/json", },
        body: JSON.stringify(b)
    }) // 返回一个Promise对象
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log(data.data);
        data = data.data;
        var items = new Array(data.length);
        for (var i = 0; i < data.length; i++) {
            items[i] = new rightItem(data[i]["description"], data[i]["lang"], data[i]["starCount"], data[i]["forkCount"], data[i]["url"], data[i]["langColor"]);
        }
        return (items);
    });
}
// 构造右边
function buildRight(path, b) {
    getRightData(path, b)
        .then(function (data) {
        console.log(data);
        var dataR = document.querySelector(".dataR");
        while (dataR === null || dataR === void 0 ? void 0 : dataR.firstChild) {
            dataR.firstChild.remove();
        }
        for (var i = 0; i < data.length; i++) {
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.href = data[i]._url;
            a.target = "_blank";
            // 构造数据盒子
            var div = document.createElement("div");
            div.className = "box";
            // 上盒子
            var divUp = document.createElement("div");
            divUp.className = "divUp";
            divUp.innerText = data[i]._id;
            // 中盒子
            var divMid = document.createElement("div");
            divMid.className = "divMid";
            var midText = document.createElement("div");
            midText.className = "midText";
            if (data[i]._description == "")
                midText.innerText = "No description provided";
            else
                midText.innerText = data[i]._description;
            divMid.appendChild(midText);
            // 下盒子
            var divDown = document.createElement("div");
            divDown.className = "divDown";
            var divStar = document.createElement("span");
            divStar.innerText = " " + numString(data[i]._starCount);
            divStar.className = "divStar";
            var divFork = document.createElement("span");
            divFork.innerText = " " + numString(data[i]._forkCount);
            divFork.className = "divFork";
            var divLang = document.createElement("span");
            divLang.className = "divLang";
            var c = document.createElement("i");
            c.style.backgroundColor = data[i]._langColor;
            var s = document.createElement("span");
            if (data[i]._lang == "")
                s.innerText = "Other";
            else
                s.innerText = data[i]._lang;
            divLang.appendChild(c);
            divLang.appendChild(s);
            divDown.appendChild(divStar);
            divDown.appendChild(divFork);
            divDown.appendChild(divLang);
            div.appendChild(divUp);
            div.appendChild(divMid);
            div.appendChild(divDown);
            a.appendChild(div);
            li.appendChild(a);
            dataR === null || dataR === void 0 ? void 0 : dataR.appendChild(li);
        }
    });
}
// 类型选择监听
function addTypeListener(choose) {
    var _a, _b, _c, _d;
    (_a = document.querySelector(".left .type")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        var list = document.querySelector(".left .list ");
        var arrow = document.querySelector(".left .arrow ");
        if (choose[0] == false) {
            choose[0] = !choose[0];
            list.style.display = "block";
            arrow.setAttribute("style", "-moz-transform:scaleY(-1);-webkit-transform:scaleY(-1);-o-transform:scaleY(-1);");
        }
        else {
            choose[0] = !choose[0];
            list.style.display = "none";
            arrow.setAttribute("style", "-moz-transform:scaleY(1);-webkit-transform:scaleY(1);-o-transform:scaleY(1);");
        }
    });
    (_b = document.querySelector(".right .one")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        var list = document.querySelector(".right .one .list");
        var arrow = document.querySelector(".right .one .arrow");
        if (choose[1] == false) {
            choose[1] = !choose[1];
            list.style.display = "block";
            arrow.setAttribute("style", "-moz-transform:scaleY(-1);-webkit-transform:scaleY(-1);-o-transform:scaleY(-1);");
        }
        else {
            choose[1] = !choose[1];
            list.style.display = "none";
            arrow.setAttribute("style", "-moz-transform:scaleY(1);-webkit-transform:scaleY(1);-o-transform:scaleY(1);");
        }
    });
    (_c = document.querySelector(".right .two")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
        var list = document.querySelector(".right .two .list");
        var arrow = document.querySelector(".right .two .arrow ");
        if (choose[2] == false) {
            choose[2] = !choose[2];
            list.style.display = "block";
            arrow.setAttribute("style", "-moz-transform:scaleY(-1);-webkit-transform:scaleY(-1);-o-transform:scaleY(-1);");
        }
        else {
            choose[2] = !choose[2];
            list.style.display = "none";
            arrow.setAttribute("style", "-moz-transform:scaleY(1);-webkit-transform:scaleY(1);-o-transform:scaleY(1);");
        }
    });
    (_d = document.querySelector(".right .three")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
        var list = document.querySelector(".right .three .list");
        var arrow = document.querySelector(".right .three .arrow ");
        if (choose[3] == false) {
            choose[3] = !choose[3];
            list.style.display = "block";
            arrow.setAttribute("style", "-moz-transform:scaleY(-1);-webkit-transform:scaleY(-1);-o-transform:scaleY(-1);");
        }
        else {
            choose[3] = !choose[3];
            list.style.display = "none";
            arrow.setAttribute("style", "-moz-transform:scaleY(1);-webkit-transform:scaleY(1);-o-transform:scaleY(1);");
        }
    });
}
// 左右数据选择
function lChoose(type) {
    if (type[0] == "综合") {
        return ["https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed?uuid=7208477600016336399&aid=6587", { "client_type": 6587, "cursor": "0", "id_type": 2, "limit": 20, "sort_type": type[1] }];
    }
    if (type[0] == "前端") {
        return ["https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587", { "limit": 20, "client_type": 6587, "cursor": "0", "id_type": 2, "cate_id": "6809637767543259144", "sort_type": type[1] }];
    }
    if (type[0] == "后端") {
        return ["https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587", { "limit": 20, "client_type": 6587, "cursor": "0", "id_type": 2, "cate_id": "6809637769959178254", "sort_type": type[1] }];
    }
    if (type[0] == "Android") {
        return ["https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587", { "limit": 20, "client_type": 6587, "cursor": "0", "id_type": 2, "cate_id": "6809635626879549454", "sort_type": type[1] }];
    }
    if (type[0] == "iOS") {
        return ["https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587", { "limit": 20, "client_type": 6587, "cursor": "0", "id_type": 2, "cate_id": "6809635626661445640", "sort_type": type[1] }];
    }
    if (type[0] == "人工智能") {
        return ["https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587", { "limit": 20, "client_type": 6587, "cursor": "0", "id_type": 2, "cate_id": "6809637773935378440", "sort_type": type[1] }];
    }
    if (type[0] == "阅读") {
        return ["https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587", { "limit": 20, "client_type": 6587, "cursor": "0", "id_type": 2, "cate_id": "6809637772874219534", "sort_type": type[1] }];
    }
    if (type[0] == "开发工具") {
        return ["https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587", { "limit": 20, "client_type": 6587, "cursor": "0", "id_type": 2, "cate_id": "6809637771511070734", "sort_type": type[1] }];
    }
    if (type[0] == "代码人生") {
        return ["https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed?uuid=7208477600016336399&aid=6587", { "limit": 20, "client_type": 6587, "cursor": "0", "id_type": 2, "cate_id": "6809637776263217160", "sort_type": type[1] }];
    }
}
function rChoose(type) {
    var change = new Array(3);
    if (type[0] == "热门")
        change[0] = "trending";
    else
        change[0] = "upcome";
    if (type[1] == "今日")
        change[1] = "day";
    if (type[1] == "本周")
        change[1] = "week";
    if (type[1] == "本月")
        change[1] = "month";
    if (type[2] == "所有语言")
        change[2] = "all";
    else
        change[2] = type[2].toLowerCase();
    return ["https://e.juejin.cn/resources/github", { "category": change[0], "period": change[1], "lang": change[2], "offset": 0, "limit": 30 }];
}
// 列表监听
function addLChooseListener(lType, rType, deg) {
    var _a, _b, _c, _d, _e, _f;
    (_a = document.querySelector(".left .list")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (event) {
        lType[0] = event.target.innerText;
        document.querySelector(".left .type span").innerText = event.target.innerText;
        var lInfo = lChoose(lType);
        buildLeft(lInfo[0], lInfo[1]);
    });
    (_b = document.querySelector(".one .list")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function (event) {
        rType[0] = event.target.innerText;
        document.querySelector(".one span").innerText = event.target.innerText;
        var rInfo = rChoose(rType);
        buildRight(rInfo[0], rInfo[1]);
    });
    (_c = document.querySelector(".two .list")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function (event) {
        rType[1] = event.target.innerText;
        document.querySelector(".two span").innerText = event.target.innerText;
        var rInfo = rChoose(rType);
        buildRight(rInfo[0], rInfo[1]);
    });
    (_d = document.querySelector(".three .list")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function (event) {
        rType[2] = event.target.innerText;
        document.querySelector(".three span").innerText = event.target.innerText;
        var rInfo = rChoose(rType);
        buildRight(rInfo[0], rInfo[1]);
    });
    (_e = document.querySelector(".left .active")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function (event) {
        lType[1] = 200;
        document.querySelector(".left .active span").style.color = "#1E80FF";
        document.querySelector(".left .active svg").style.fill = "#1E80FF";
        document.querySelector(".left .latest").style.color = "#4E5969";
        var div = document.querySelector(".left .active svg");
        deg += 360;
        div.style.transform = "rotate(" + deg + "deg)";
        var lInfo = lChoose(lType);
        buildLeft(lInfo[0], lInfo[1]);
    });
    (_f = document.querySelector(".left .latest")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function (event) {
        lType[1] = 300;
        document.querySelector(".left .active span").style.color = "#4E5969";
        document.querySelector(".left .active svg").style.fill = "#4E5969";
        document.querySelector(".left .latest").style.color = "#1E80FF";
        var lInfo = lChoose(lType);
        buildLeft(lInfo[0], lInfo[1]);
    });
}
