import React from "react";
import "./Signin.css"
class Signin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            signInEmail: "",
            signInPassword: ""
        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail : event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword : event.target.value})
    }

    onSubmitSignin = () => {
        if(this.state.signInEmail.length === 0 || this.state.signInPassword.length === 0){
            alert("Email and password are required fields. Please fill them out.");
            return;
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "email": this.state.signInEmail,
        "password": this.state.signInPassword
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://boiling-tundra-63669-18b87894e11b.herokuapp.com/signin", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result[0].id){
                this.props.loadUser(result[0])
                this.props.onRouteChange("home")
            }
            else{
                alert("Incorrect Credentials! Unable to verify.");

            }
        })
        .catch(error => console.log('error', error));
        
    }

    render(){
        return (
            <div>
                <div className="login-box">
                    <h2>Login</h2>
                    <form>
                        <div className="user-box">
                            <input 
                            type="text" 
                            name="" 
                            required 
                            onChange={this.onEmailChange}
                            />
                            <label>Email</label>
                        </div>
                        <div className="user-box">
                            <input type="password" 
                            name="" 
                            required
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
                            <a href="#" onClick={() => this.props.onRouteChange("register")}
                            style={{textDecoration: "None", color: "white"}}>
                            REGISTER
                            </a>
                        </div>
                    <p> Username: demo@gmail.com password: 123 </p>
                    </form>
                </div>
            </div>
        )
    }
}

export default Signin