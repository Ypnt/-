import { useEffect, useState } from "react";
import Input from "./Input";
import Todo from "./Todo";

export default function List() {
  const [data, setData] = useState([] as any[]);
  // 启动时读取文件：/api/todo/list
  useEffect(() => {
    var data = localStorage.getItem("listData");
    // localStorage拿不到数据，则向后端请求
    if (data === null) {
      fetch("/api/todo/list", {
        method: "GET",
      })
        .then((res) => {
          return res.text();
        })
        .then((text) => {
          try {
            const data = JSON.parse(text); // 尝试解析响应体为JSON格式
            console.log("启动时读取文件");
            setData(data);
            localStorage.setItem("listData", JSON.stringify(data));
          } catch (error) {
            console.error(error);
          }
        });
    } else setData(JSON.parse(data));
  }, []);

  // 向后端发送请求（利用泛型）
  function send<C>(path: string, headers: string, body: C) {
    fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": headers,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        try {
          const change = JSON.parse(text);
          if (change["success"] === true) {
            if (change["type"] === "create") {
              var data_ = data;
              data_ = data_.concat(body);
              setData(data_);
              localStorage.setItem("listData", JSON.stringify(data_));
            }
            if (change["type"] === "dlt") {
              var data_ = data.filter((item) => item["id"] !== body);
              setData(data_);
              localStorage.setItem("listData", JSON.stringify(data_));
            }
            if (change["type"] === "updata") {
              var data_ = data.map((item) => {
                if (item["id"] === body) {
                  item["mtime"] = Date.now();
                  item["finished"] = !item["finished"];
                  return item;
                } else return item;
              });
              setData(data_);
              localStorage.setItem("listData", JSON.stringify(data_));
            }
          }
        } catch (error) {
          console.error(error);
        }
      });
  }

  return (
    <>
      <Input send={send}></Input>
      <ul>
        {data.map((item) => (
          <Todo
            send={send}
            key={item["id"]}
            id={item["id"]}
            content={item["content"]}
            finished={item["finished"]}
            ctime={item["ctime"]}
            mtime={item["mtime"]}
          ></Todo>
        ))}
      </ul>
    </>
  );
}
