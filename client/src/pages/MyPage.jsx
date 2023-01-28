import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../component/Header"
import axios from 'axios';
import { useEffect } from "react";
import Result from "../component/Result";

const MyPage = () => {

  const {id} = useParams()
  const [data, setData] = useState(null);
  
  useEffect(()=>{
    axios
    .get("/list")
    .then((d) => {
      let temp = d.data.filter((x) => x.writer === id);
      temp !== [] && setData(temp);
    });
  },[])

  var nullPage = <div className="mypage-message"><p>링크 등록에서 추가하면 여기서 볼 수 있어요! 👍</p></div>

  return (
    <>
      <Header now="login-active"></Header>
      <div className="result-box">
        {
        data === null ? nullPage
        : data.map((list) => (
          <Result
            key={list._id}
            id={list._id}
            title={list.title}
            keywords={list.keywords}
            data={data}
            setData={setData}
          ></Result>
        )) 
      }
      </div>
    </>
  );
}


export default MyPage;