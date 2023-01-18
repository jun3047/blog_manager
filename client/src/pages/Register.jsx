
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header"

const Register = () => {

    const navigate = useNavigate();

    return(<>
    <Header now={'login-active'}></Header>
    <div className="login-wrap">
        <h1>☺️ 환영합니다! 😄</h1>
        <div className="login-box">
            <form action="/register" method="POST">
                <h4>아이디</h4>
                <input type="text" placeholder="id" name="id"/>
                <h4>패스워드</h4>
                <input type="password" placeholder="pw" name="pw"/>
                <button className="submit" onClick={()=>{navigate('/register')}}>가입하기</button>
            </form>
        </div>
    </div>
    </>)
}

export default Register;