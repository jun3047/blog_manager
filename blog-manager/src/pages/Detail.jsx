
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../component/Header"

const data = // id에 맞는 데이터임을 가성
    {
        id: 1,
        title: '영어, 이렇게 외우셈',
        keywords: ['영어', '교육'],
        topRate: [{'2022-03-02': 4, '2022-03-03': 5, '2022-03-04': 5, '2022-03-05': 5, '2022-03-06': 5, '2022-03-07': 5,}, {'2022-03-04': 4, '2022-03-05': 1,}],
    }

const Table = () => {
        return data.keywords.map((keyword)=>{
            const index = data.keywords.indexOf(keyword)
            return (
              <>
                <h3 className="title">{keyword}</h3>
                <div className="table-wrap">
                  <table>
                    {
                        Object.keys(data.topRate[index]).map((date)=><th>{date}</th>)
                    }
                    <tr>
                    {
                        Object.values(data.topRate[index]).map((date)=><td>{date}</td>)
                    }
                    </tr>
                  </table>
                </div>
              </>
            );
        })
}

const Detail = () => {

    const {id} = useParams(); 
    
    // 나중에 이거에 맞는 데이터 가져오기


    return(<>
    <Header></Header>
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