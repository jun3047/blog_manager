
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../component/Header"

var data;

const Detail = () => {

  const location = useLocation();
  data = location.state.data;

  return(<>
  <Header now="login-active"></Header>
  <div className="detail-box">
      <div className="detail">
          <h4>제목</h4>
          <div className="result-title">{data.title}</div>
          <h4>검색어</h4>
          <div className="result-keyword">
          {
              data.keywords.map(keyword=>
                  keyword + ', '
              )
          }
          </div>
      </div>
      <Table></Table>
  </div>
  </>)
}


const Table = () => {

    return data.keywords.map((keyword)=>{

        const localData = data.data.filter((data)=> data.keyword === keyword)

        return (
          <>
            <h3 className="title">{keyword}</h3>
            <div className="table-wrap">
              <table>
                {
                  localData.map((data)=>{
                    
                    return<td>
                      <tr>{data.date}</tr>
                      <tr><b>{data.rank}</b></tr>
                    </td>
                  })
                }
              </table>
            </div>
          </>
        );
    })
}

export default Detail;