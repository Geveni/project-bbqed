import { render } from "@testing-library/react";
import axios from "axios";
import React from 'react';  
import '../styling/ProfilePopup.css'  

class Popup extends React.Component {  
  constructor(props){
    super(props);
    this.state = {
      user: 'user1',
      body: '', 
      postCharacters: 500, 
      done: false,
      showError: false, 

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);
  
  }
  
  onChangeBody(e) {
    //console.log("Post: " + e.target.value)
    
    this.setState ({
      body: e.target.value,
      postCharacters: 500 - e.target.value.length
    }, () => this.onSubmit(e))
    
  }
  
  onSubmit() {

  }
  handleSubmit(event) {
    if (/^\s+$/.test(this.state.body) || !this.state.body) {
      this.setState ({
        showError: true,  
      })
      console.log("popup-error:" + this.state.showError); 
    }
    else { 
      const body = {
        poster: this.state.user,
        body: this.state.body 

      }
      axios.post('http://localhost:5000/post/add', body)
      .then(response => {
        this.setState ({
          done: true, 
          showError:false, 
        })
      }) 
      .catch((error) => {
        console.log(error);
      })
    }
    

    
  }
  render() {  
  return (  
  <div className='profile-popup'>  
    <div className='profile-popup-popup-content'>  
      <div>
        <button className="profile-popup-close-button" onClick={this.props.closePopup}> X </button>  
      </div>
      {this.state.done ? 
        <div className="profile-popup-content"> 
          <h1> Post submitted! </h1>
        </div>
      :
      <div className="profile-popup-content"> 
        <h1> Create a Post </h1>
        <input type="text" id="timer" maxLength="500" onChange={this.onChangeBody} className="profile-popup-input" name="post-content" />
        <label className="profile-popup-input-characters" >Characters remaining: {this.state.postCharacters} </label>
        <button className="profile-popup-submit-button" onClick={this.handleSubmit}> Post </button>
        {this.state.showError && <label > Cannot post an empty post! </label> } 
      </div>
      
      }
    </div>  
  </div>  
  );  
  }  
}  

export default Popup;