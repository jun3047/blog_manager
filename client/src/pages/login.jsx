
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header"

const Login = () => {

    const navigate = useNavigate();

    return(<>
    <Header now={'login-active'}></Header>
    <div className="login-wrap">
        <h1>πͺ μ€λλ μ¬λ¬λΆμ λΈλ‘κ·Έ μμν©λλ€ π</h1>
        <div className="login-box">
            <form action="/login" method="POST">
                <h4>μμ΄λ</h4>
                <input type="text" placeholder="id" name="id"/>
                <h4>ν¨μ€μλ</h4>
                <input type="password" placeholder="pw" name="pw"/>
                <button className="submit" type="submit">μμ₯νκΈ°</button>
                <button className="register" onClick={()=>{navigate('/register')}}>μ²μ μμ΄μ</button>
            </form>
        </div>
    </div>
    </>)
}

export default Login;