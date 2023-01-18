import axios from "axios";
import React, { useReducer } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/store";


const Header = ({now}) => {

    const [isLogin,setIsLogin] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    var id;

    axios
    .get("/user") //보통 json
    .then((d) => {
      if(d.data == false){
        setIsLogin(false)
      }else{
        setIsLogin(true)// 전역변수에 데데이터 넣기
        dispatch(setUser(d.data))
        console.log(d.data);
        id = d.data.id;
      } //  전역 변수로 지정
    })

    var meun;

    if(isLogin){
        meun = <div className="login" onClick={()=>{navigate('/myPage/'+id)}} ><span className={now}>내 페이지</span></div>
    }else{
        meun = <div className="login" onClick={()=>{navigate('/login')}} ><span className={now}>로그인</span></div>
    }


    return(<header>
    <div className="logo" onClick={()=>{navigate('/intro')}}>O-O</div>
    <div className="flex-box"></div>
    <div className="meun">
        <div className="overview" onClick={()=>{navigate('/intro')}} ><span className={now}>소개</span></div>
        <div className="link-roll" onClick={()=>{navigate('/')}} ><span className={now}>링크 등록</span></div>
        {meun}
    </div>
    </header>)
}

export default Header;