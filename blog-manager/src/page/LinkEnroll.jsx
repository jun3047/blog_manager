import React from "react";
import { useState } from "react";
import Header from "../component/Header"


const KeywordBox = () => {
    return(<>
        <div className="keyword-box">
            <form action="" id="keyword">
                <h4>블로그 글 제목</h4>
                <input className="title" type="text" placeholder= "영어, 단어는 이렇게 외우는 것입니다." />
                {/* <div className="line"></div> */}
                <h4>원하는 키워드</h4>
                <input className="keyword" type="text" placeholder= "학생,수능영어,고등학생,영어꿀팁" />
            </form>
        </div>
    </>)
}

const LinkEnroll = () => {

    const [keywordBox, setKeywordBox] = useState([{title: "", keywords: []}]);

    return(<>
    <Header></Header>
    <div className="intro">
        <h1>블로그 상위노출 매니저</h1>
        <p>상위노출 현황을 매일 보고 해줍니다</p>
        <p>제목과 키워드만 적으면 됩니다.</p>
    </div>
    <div className="keywords">
        {
            keywordBox.map((a)=>{
                return <KeywordBox key={a}></KeywordBox>
            })
        }
        <div className="plus" onClick={()=>{
            setKeywordBox([...keywordBox, {title: "", keywords: []}])
        }}>+</div>
        <button form="keyword" className="submit"> 등록하기 </button>
    </div>
    </>)
}

export default LinkEnroll;