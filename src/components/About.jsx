import React from 'react'
import { Component } from 'react'
import User from './User'
import UserClass from './UserClass'
import UserContext from '../utils/UserContext'

class About extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  render(){
    return (
    <div>
      <h1>About</h1>
      <div>
        LoggedIn User

        {/* This is a component */}
        <UserContext.Consumer>
          {({loggedInUser}) => <h1>{loggedInUser}</h1>}
        </UserContext.Consumer>

      </div>
      <h2>This is Namaste React Episode 11</h2>
      <UserClass name={"Aashish Rana (class)"} location={"Tehri Garhwal (class)"}/>
    </div>
  )
  }
}

export default About
