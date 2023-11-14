import React, { memo, useState } from "react";
import "./Todo.css";
import { v4 as uuidv4 } from "uuid";
interface IPorps {
  send: <C>(path: string, headers: string, body: C) => void;
}

function Input(porps: IPorps) {
  const [inputValue, setInputValue] = useState("");
  // 处理enter键按下
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      console.log(inputValue);
      if (inputValue !== "") {
        var id: string = uuidv4();
        var content: string = inputValue;
        var finished: boolean = false;
        var ctime: number = Date.now();
        var mtime: number = Date.now();
        var newTodo = {
          id: id,
          content: content,
          finished: finished,
          ctime: ctime,
          mtime: mtime,
        };
        porps.send("/api/todo/create", "application/json", newTodo);
      }
      (event.target as HTMLInputElement).value = "";
    }
  };
  // 实时获取输入框数据
  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        className="input"
        placeholder="What needs to be done?"
        autoComplete="false"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
    </>
  );
}
export default memo(Input);
