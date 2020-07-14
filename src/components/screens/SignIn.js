import React, {useState, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App'
import M from 'materialize-css';

const SignIn = () => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return M.toast({html: "invalid email", classes: "#f44336 red"})
        }
        fetch("/signin", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                    M.toast({html: data.error, classes: "#f44336 red"})
                }
                else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user)) 
                    dispatch({type:"USER", payload:data.user})
                    M.toast({html:"You're In!", classes:"#2e7d32 green darken-3"})
                    history.push('/')
                }
            }).catch(err=>{
                console.log(err)
            })
    }
    return ( 
        <div className="mycard">
            <div className="card auth-card input-field">
            <h2 className="login-title">Kodagram</h2>
            <input 
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
            type="text"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button className="btn waves-effect waves-light #1e88e5 blue darken-1"
            onClick={()=>PostData()}>
                Signin
            </button>
            <h5>
            <Link to="/signup">Need to make an account?</Link>
        </h5>
    
            </div>
        </div>
     )
}

export default SignIn