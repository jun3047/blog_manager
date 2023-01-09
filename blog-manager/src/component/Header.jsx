import React from "react";
import { useNavigate } from "react-router-dom";


const Header = ({now}) => {

    const navigate = useNavigate();

    return(<header>
    <div className="logo" onClick={()=>{navigate('/intro')}}>O-O</div>
    <div className="flex-box"></div>
    <div className="meun">
        <div className="overview" onClick={()=>{navigate('/intro')}} ><span className={now}>소개</span></div>
        <div className="link-roll" onClick={()=>{navigate('/')}} ><span className={now}>링크 등록</span></div>
        <div className="login" onClick={()=>{navigate('/myPage')}} ><span className={now}>내 페이지</span></div>
    </div>
    </header>)
}

export default Header;