import React from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../component/Header"
import axios from 'axios';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Result = ({title, keywords, id, data, setData, writer}) => {

    const user = useSelector((state)=> state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
      axios
          .get("/list") //보통 json
          .then((d) => {
            let temp = d.data.filter(x=> x.writer === writer)
            console.log(temp)
            temp !== [] && setData(temp)
          })
    },[])

    return(
        <div className="result" onClick={()=>{
            var temp = data.filter((e)=> e._id === id)
            navigate('/detail/' + id, {state: {data: temp[0]}})
        }}>
            <div className="del" onClick={(e)=>{
                e.stopPropagation();
                // const idx = data.findIndex((item) => item._id === id);
                // data.splice(idx,1)
                var temp = data.filter((e)=> e._id !== id)
                console.log(temp)
                setData(temp)

                axios.delete("/list", { data: { _id: id } }).then(() => {
                  console.log('성공');
                }).catch((err,result)=>{
                    if(err) return err
                    console.log('에러');
                });
                //삭제요청하기 
            }}>X</div>
            <h4>제목</h4>
            <div className="result-title">{title}</div>
            <h4>검색어</h4>
            <div className="result-keyword">
            {
                keywords.map(keyword=>
                    keyword + ', '
                )
            }
            </div>
        </div>
    )
}



const MyPage = () => {

  const {id} = useParams()

  const [data, setData] = useState([
      {
          title: '제목 예시임, x 누르면 삭제',
          keywords: ['이런거', '태그', '검색어', '들어가는거'],
          _id: 0,
          writer: '1',
      }
  ]);

    return (
      <>
        <Header now="login-active"></Header>
        <div className="result-box">
          {
          data != "" ?
          data.map((list) => (
            <Result
              writer={id}
              key={list._id}
              id={list._id}
              title={list.title}
              keywords={list.keywords}
              data={data}
              setData={setData}
            ></Result>
          )) 
          : <div>링크 등록에서 추가하셈</div>
        }
        </div>
      </>
    );
}

export default MyPage;