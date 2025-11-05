import React from 'react'
import { Component } from 'react'
import UserContext from '../utils/UserContext'
import UserClass from './UserClass'
import { LOGO_URL } from '../utils/constant'

class About extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  render(){
    return (
      <div className="min-h-screen bg-orange-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              About <span className="text-orange-600">Me</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg px-4"> Web Developer | Problem Solver</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 sm:mb-12">
            <div className="lg:col-span-1">
              <UserClass name={"Aashish Rana"} location={"Delhi, India"} />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div>
                  <img src={LOGO_URL} alt="" className='h-[100px] w-[100px]'/>
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
            </div>
          </div>
          <div className="bg-orange-600 rounded-2xl shadow-2xl p-6 sm:p-8 text-center text-white">
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
                className="bg-white text-orange-600 font-semibold py-3 px-6 sm:px-8 rounded-lg hover:bg-orange-50 transition-colors duration-200 shadow-lg">
                GitHub Profile
              </a>
              <a
                href="mailto:aashishrana.tech@gmail.com"
                className="bg-white text-orange-600 font-semibold py-3 px-6 sm:px-8 rounded-lg hover:bg-orange-50 shadow-lg"
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