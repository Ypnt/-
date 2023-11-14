import { memo } from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "./Todo.css";
interface ITodo {
  id: string;
  content: string;
  finished: boolean;
  ctime: number;
  mtime: number;
  send: <C>(path: string, headers: string, body: C) => void;
}

function Todo(porps: ITodo) {
  function dlt() {
    porps.send("/api/todo/delete", "text/plain", porps.id);
  }
  function change() {
    porps.send("/api/todo/update", "text/plain", porps.id);
  }
  return (
    <>
      <li className={porps.finished ? "todo-item todo-finished" : "todo-item"}>
        <i className="iconfont icon-checkbox" onClick={change}></i>
        <span className="todo-title">
          <span>{porps.content}</span>
          <span>
            {dayjs(porps.ctime).locale("zh-cn").format("M月D日HH:mm:ss")}
          </span>
        </span>
        <i className="iconfont icon-delete" onClick={dlt}></i>
      </li>
    </>
  );
}
export default memo(Todo);
