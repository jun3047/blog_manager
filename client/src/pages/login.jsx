
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header"

const Login = () => {

    const navigate = useNavigate();

    return(<>
    <Header now={'login-active'}></Header>
    <div className="login-wrap">
        <h1>💪 오늘도 여러분의 블로그 응원합니다 👍</h1>
        <div className="login-box">
            <form action="/login" method="POST">
                <h4>아이디</h4>
                <input type="text" placeholder="id" name="id"/>
                <h4>패스워드</h4>
                <input type="password" placeholder="pw" name="pw"/>
                <button className="submit" type="submit">입장하기</button>
                <button className="register" onClick={()=>{navigate('/register')}}>처음 왔어요</button>
            </form>
        </div>
    </div>
    </>)
}

export default Login;