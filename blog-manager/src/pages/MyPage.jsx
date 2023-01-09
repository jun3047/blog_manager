import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header"

const lists = [
    {
        title: '영어 이렇게 외우셈',
        keywords: ['이런거','저런거']
    },
]

const Result = ({title, keywords, key}) => {

    const navgate = useNavigate();

    return(
        <div className="result" onClick={()=>{
            navgate('/myPage/'+ key)
        }}>
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

    return(<>
    <Header now="login-active"></Header>
    <div className="result-box">
        {
            lists.map((list,key) => <Result key={key} id={key} title={list.title} keywords={list.keywords}></Result>
            )
        }
    </div>
    </>)
}

export default MyPage;