
import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../component/Header"

// const data = // id에 맞는 데이터임을 가성
//     {
//         id: 1,
//         title: '영어, 이렇게 외우셈',
//         keywords: ['영어', '교육'],
//         topRate: [{'2022-03-02': 4, '2022-03-03': 5, '2022-03-04': 5, '2022-03-05': 5, '2022-03-06': 5, '2022-03-07': 5,}, {'2022-03-04': 4, '2022-03-05': 1,}],
//     }

var data;

const Table = () => {

    return data.keywords.map((keyword)=>{
        console.log("data: " + data);

        const localData = data.data.filter((data)=> data.keyword === keyword)
        console.log(localData)

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

export default Detail;