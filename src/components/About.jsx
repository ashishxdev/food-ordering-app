// import React from 'react'
// import { Component } from 'react'
// import User from './User'
// import UserClass from './UserClass'
// import UserContext from '../utils/UserContext'

// class About extends React.Component{
//   constructor(props){
//     super(props);
//   }

//   componentDidMount(){
//   }

//   render(){
//     return (
//     <div>
//       <h1>About</h1>
//       <div>
//         LoggedIn User

//         <UserContext.Consumer>
//           {({loggedInUser}) => <h1>{loggedInUser}</h1>}
//         </UserContext.Consumer>

//       </div>
//       <h2>This is About Page.</h2>
//       <UserClass name={"Aashish Rana (class)"} location={"Tehri Garhwal (class)"}/>
//     </div>
//   )
//   }
// }

// export default About
import React from 'react'
import { Component } from 'react'
import UserContext from '../utils/UserContext'
import UserClass from './UserClass'

class About extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  render(){
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              About <span className="text-orange-600">Me</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg px-4">Developer | Food Enthusiast | Problem Solver</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 sm:mb-12">
            
            {/* User Profile Card - Takes UserClass component */}
            <div className="lg:col-span-1">
              <UserClass name={"Aashish Rana"} location={"Delhi, India"} />
            </div>

            {/* Project Info Section */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* About ProFood Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl sm:text-2xl">🍔</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">About ProFood</h3>
                </div>
                
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  ProFood is a personal project I built to master <span className="font-semibold text-orange-600">React</span>, 
                  <span className="font-semibold text-orange-600"> Redux Toolkit</span>, and working with 
                  <span className="font-semibold text-orange-600"> live APIs</span>. It is inspired by modern food delivery 
                  apps like Swiggy and Zomato.
                </p>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                  This platform allows users to browse restaurants, search by location, filter by ratings, 
                  and explore restaurant menus - all powered by real-time data from Swiggy API.
                </p>

                {/* Tech Stack */}
                <div className="mb-4">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Redux Toolkit', 'Tailwind CSS', 'React Router', 'Swiggy API', 'Jest'].map((tech) => (
                      <span key={tech} className="bg-orange-100 text-orange-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Features Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Key Features</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg sm:text-xl">📍</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Location-Based Search</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Browse restaurants by city or current location</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg sm:text-xl">🔍</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Smart Filters</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Filter by ratings, cuisine, and delivery time</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg sm:text-xl">🛒</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Cart Management</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Add items and manage your order seamlessly</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg sm:text-xl">⚡</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Real-Time Data</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Live restaurant data from Swiggy API</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current User Display */}
              <UserContext.Consumer>
                {({loggedInUser}) => (
                  loggedInUser ? (
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xl sm:text-2xl">👤</span>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-orange-100">Currently browsing as</p>
                          <p className="text-lg sm:text-xl font-bold break-words">{loggedInUser}</p>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
              </UserContext.Consumer>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-2xl p-6 sm:p-8 text-center text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Let's Connect!</h3>
            <p className="text-sm sm:text-base text-orange-100 mb-4 sm:mb-6 max-w-2xl mx-auto px-4">
              Interested in collaborating or want to learn more about this project? 
              Feel free to reach out or check out my other projects on GitHub.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4" >
              <a
                href="https://github.com/ashishxdev"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-orange-600 font-semibold py-3 px-6 sm:px-8 rounded-lg hover:bg-orange-50 transition-colors duration-200 shadow-lg"
              >
                GitHub Profile
              </a>
              <a
                href="/contact"
                className="bg-orange-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg hover:bg-orange-800 transition-colors duration-200 shadow-lg"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default About