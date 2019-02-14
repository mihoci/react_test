import React from 'react'
import bcrypt from 'bcrypt'

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleLogIn = () => {
        let pass;
        bcrypt(this.state.password, 10, (err, hash) => {
            if(!err){
                pass = hash
                console.log(hash)
            }
        })

        fetch('http://localhost:3001/login',{
            method: 'POST',
            body: JSON.stringify({username: this.state.username, password: pass}),
            headers: {'Content-type': 'application/json'},
        })
        .then(res => res.json())
        .then(user => {
            if(user.id){
                this.props.passUser(user.username);
            }
        })
        .catch(err => console.error(err))
    }

    render(){
        return(
            <div onKeyPress={(e) => {if(e.key==='Enter') this.handleLogIn()}}>
                <h1>User login</h1>
                <div>
                    <label>user: </label>
                    <input 
                        type='text' 
                        onChange={(e)=>{this.setState({username: e.target.value})}}
                    />
                </div>
                <div>
                    <label>pass: </label>
                    <input 
                        type='password' 
                        onChange={(e)=>{this.setState({password: e.target.value})}}
                    />
                </div>
                <div>
                    <input 
                        type='button' 
                        value='Log in' 
                        onClick={this.handleLogIn} 
                    />
                </div>
            </div>)
        ;
    }
}

export default Login;