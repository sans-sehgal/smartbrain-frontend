import React from "react";
import "./Signin.css"

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            registerEmail: "",
            registerPassword: "",
            registerName:""
        }
    }

    onEmailChange = (event) => {
        this.setState({registerEmail : event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({registerPassword : event.target.value})
    }

    onNameChange = (event) => {
        this.setState({registerName : event.target.value})
    }

    onSubmitSignin = () => {
        if(this.state.registerEmail.length=== 0 || 
            this.state.registerPassword.length=== 0 || 
            this.state.registerName.length === 0){
            alert("All fields are required. Please fill them out.");

            return;
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "email": this.state.registerEmail,
        "password": this.state.registerPassword,
        "name" : this.state.registerName

        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://boiling-tundra-63669-18b87894e11b.herokuapp.com/register", requestOptions)
        .then(response => response.json())
        .then(result => {
            // console.log(result)
            if (result[0].id){

                this.props.onRouteChange("signin")
            }
        })
        .catch(error => console.log('error', error));
        
    }


    render(){
    return (
        <div>
            <div className="login-box">
                <h2>Register</h2>
                <form>
                    <div className="user-box">
                        <input type="text" 
                        name="" 
                        required="true" 
                        onChange = {this.onEmailChange}

                        />
                        <label>Email</label>
                    </div>
                    <div className="user-box">
                        <input type="text" 
                        name="" 
                        required="true" 
                        onChange = {this.onNameChange}
                        />
                        <label>Username</label>
                    </div>
                    <div className="user-box">
                        <input type="password" 
                        name="" 
                        required="true" 
                        onChange = {this.onPasswordChange}
                        />
                        <label>Password</label>
                    </div>
                    <div className="align-correction">
                        <a href="#" onClick={this.onSubmitSignin}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Submit

                        </a>
                    </div>
                </form>
                
            
            </div>
            
        </div>
    )
}
}

export default Register