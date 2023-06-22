import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import ParticlesBg from 'particles-bg'
import React from 'react';
import Register from './Components/Signin/Register';

const setupClarifai = (image_url) => {
  const PAT = '2c8fcc186cef4c079de2aa40ce492fc6';
  const USER_ID = 'sans0099';       
  const APP_ID = 'my-first-application-iq9ysx';
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = image_url;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
  });

  return {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
}

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      input : "",
      image_url: "",
      box: {},
      route: 'signin',
      isSignedIn : false,
      user : {
        id : '',
        name: '',
        email: '',
        entries : 0,
        joined: ''
      }
    }
  }
  

  loadUser = (data) => {
    this.setState({user: {
      id : data.id,
      name : data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }}
    )
    this.setState({image_url : ""})
  }

  calcFaceLocation = (result) => {
    const face_coords = result.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById("inputimage");
    const width = Number(img.width);
    const height = Number(img.height);


    return {
      leftCol: face_coords.left_col * width,
      topRow: face_coords.top_row * height,
      rightCol: width - (face_coords.right_col * width),
      bottomRow: height - (face_coords.bottom_row * height)

    }
  }
  
  displayFaceBox = (box) => {
    this.setState({box: box});

  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }


  
  onButtonSubmit = () => {
    this.setState({image_url: this.state.input})
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", setupClarifai(this.state.input))
    .then(response => response.json())
    .then(result =>
    {
      if(result)
      {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "id": this.state.user.id,
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://boiling-tundra-63669-18b87894e11b.herokuapp.com/image", requestOptions)
        .then(response => response.json())
        .then(result => {
          this.setState(Object.assign(this.state.user, {entries : result}))
        })
        .catch(error => console.log('error', error));
      }
      this.displayFaceBox(this.calcFaceLocation(result))}
    )
    .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if(route === 'signin'){
      this.setState({isSignedIn: false})
    }
    else if(route === 'register'){
      this.setState({isSignedIn: false})
    }
    else{
      this.setState({isSignedIn: true})

    }
    
    
    this.setState({route: route})


  }

  render(){
  return (
    <div className="App">
      {this.state.route === "signin"?
        <div>
          {/* <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange}/> */}
          <Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
        </div>
      :
        this.state.route === "register"?
        <div>
          <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
          <Register onRouteChange={this.onRouteChange} />
        </div>
          :  
          <div>
            <ParticlesBg color = "#ffffff" type="cobweb" bg={true} />
            <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
            <Logo />
            <Rank name = {this.state.user.name} entries = {this.state.user.entries}/> 
            <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
            <FaceRecognition box = {this.state.box} image_url = {this.state.image_url}/>
          </div>
      }
    </div>
  );
  }
}

export default App;
