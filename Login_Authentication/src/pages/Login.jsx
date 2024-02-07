import React, { useContext } from "react";
import { useRef, useState, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
const LOGIN_URL = "/api-request/login"

export const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const  userRef = useRef();
    const  errRef = useRef();

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')

    const [errMsg, setErrMsg] = useState('');


    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({user, pwd}),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
            setUser("");
            setPwd("");

            console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            console.log(accessToken);
        } catch (err) {
            if(!err?.response) {
                setErrMsg("No Server Response");
            }else if(err.response?.status === 310){
                setErrMsg(err.response.data);
                setPwd("");
            }
            errRef.current.focus();
        }
    }
    return(
        <section>
        <h1>Login</h1>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <form onSubmit={handelSubmit}>
            <label htmlFor="username">
                UserName:
            </label>
            <input 
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required /> <br />
            <label htmlFor="password">
                Password:
            </label>
            <input 
                type="password"
                id="password"
                ref={userRef}
                autoComplete="off"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required /> <br />
            <button>Sign In</button>
        </form>

        </section>
    )
}
export default Login