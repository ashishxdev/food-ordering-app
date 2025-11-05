import React from 'react'

class UserClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userinfo: {
                name: "Dummy",
                location: "Default"
            }
        }
    }

    async componentDidMount(){
        // Api call
        const data = await fetch("https://api.github.com/users/ashishxdev")
        const json = await data.json();
        // console.log(json)

        this.setState({
            userinfo: json,
        })
    }

    componentDidUpdate(){
        // console.log("Component did Update")
    }

    componentWillUnmount(){
        // console.log("Component did unmount")
    }
    
    render(){
        const { name, location, avatar_url} = this.state.userinfo;
        return (
        <div className="user-card">
            <img src={avatar_url} />
            <h2>Name: {name}</h2>
            <h3>Location: {location}</h3>
            <h4>Contact: @ashishrana2004</h4>
        </div>)
    }
}

export default UserClass