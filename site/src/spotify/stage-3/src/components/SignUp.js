import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';

class SignUpForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined,
      'handle': undefined,
      'avatar': '' //default to blank value
    }; 
  }

  //update state for specific field
  handleChange = (event) => {
    let field = event.target.name; //which input
    let value = event.target.value; //what value

    let changes = {}; //object to hold changes
    changes[field] = value; //change this field
    this.setState(changes); //update state
  }

  //handle submit button
  handleClick = (event) => {
    event.preventDefault();
    firebase.auth().fetchProvidersForEmail(this.state.email)
    .then((response) => {
      if(response.length > 0){
        this.setState({errorMessage:null}); //clear any old errors
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error) => {
          this.setState({errorMessage: error.message});
          let errorCode = error.code;
          // var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          }
        })
      } else {
        this.setState({errorMessage:null}); //clear any old errors
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error) => {
          this.setState({errorMessage: error.message});
        })
      }
    })
  }

  render() {
    return (
      <div className="playlist-options">
        <header className="desc">
            <h1>Moment Music</h1>
            <p>Sign Up or Sign In</p>
        </header>
        <form className="signup-form" >
          <input type='email' 
            id="email" 
            name="email" 
            placeholder="Email" 
            className ="sign-input" 
            onChange={this.handleChange}/>
          <input className="sign-input" 
            id="password"
            placeholder="Password"
            type="password"
            name="password"
            onChange={this.handleChange}
            />
        </form>

        {/* buttons */}
        <div className="generate-btn" id="generate" aria-label="submit" onClick={this.handleClick}>
          <div className="btn-outline" id='generate-txt'>
              Submit
          </div>
        </div>
      </div>
    )
  }
}

export default SignUpForm