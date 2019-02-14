import React from 'react';

class Users extends React.Component{
    constructor(){
        super();
        this.state = {
            users: [],
            newUsername: '',
            newPassword: ''
        }
    }


    getUsers = () => {
        fetch('http://localhost:3001/users')
        .then(res => res.json())
        .then(users => {
            let list = users.map(user => {
                return <li key={user.id}>{user.username} - {user.password}</li>
            })
            this.setState({users: list})
        })
        .catch(err => console.log(err))
    }

    handleSubmit = () =>{
        fetch('http://localhost:3001/addUser', {
            method: 'POST',
            body: JSON.stringify({username: this.state.newUsername, password: this.state.newPassword}),
            headers: {'Content-type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            if(data === 'success'){
                this.getUsers()
            }
        })
        .catch(err => console.error(err))
    }

    componentDidMount(){
        this.getUsers();
    }

    render(){
        return(
            <div>
                <div >
                    <h3>Add new user</h3>
                    <div onKeyPress={(e) => {if(e.key==='Enter') this.handleSubmit()}}>
                        <div>
                            <label>username:</label>
                            <input type='text' onChange={(e) => this.setState({newUsername: e.target.value})}/>
                        </div>
                        <div>
                            <label>password:</label>
                            <input type='password' onChange={(e) => this.setState({newPassword: e.target.value})}/>
                        </div>
                        <div>
                            <input type='button' value='Add' onClick={this.handleSubmit}/>
                        </div>
                    </div>
                </div>
                <h3>List of users</h3>
                <ul>
                    {this.state.users}
                </ul>
            </div>
        );
    }
}

export default Users