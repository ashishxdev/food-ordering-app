import React from 'react'

class UserClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userinfo: {
                name: "Loading...",
                login: "",
                bio: "",
                location: "",
                avatar_url: "",
                public_repos: 0,
                followers: 0,
                following: 0,
                html_url: "",
                company: "",
                blog: ""
            },
            isLoading: true,
            error: null
        }
    }

    async componentDidMount(){
        try {
            const data = await fetch("https://api.github.com/users/ashishxdev");
            
            if (!data.ok) {
                throw new Error('Failed to fetch GitHub data');
            }
            
            const json = await data.json();
            
            this.setState({
                userinfo: json,
                isLoading: false
            });
        } catch (error) {
            console.error("Error fetching GitHub data:", error);
            this.setState({
                error: error.message,
                isLoading: false
            });
        }
    }
    
    render(){
        const { name, login, bio, location, avatar_url, public_repos, followers, following, html_url, company, blog } = this.state.userinfo;
        const { isLoading, error } = this.state;

        // Loading State
        if (isLoading) {
            return (
                <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
                    <div className="animate-pulse">
                        <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                        <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
                        <div className="h-20 bg-gray-300 rounded mb-4"></div>
                    </div>
                </div>
            );
        }

        // Error State
        if (error) {
            return (
                <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
                    <div className="text-red-500 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Failed to load profile</h3>
                    <p className="text-sm text-gray-600">{error}</p>
                </div>
            );
        }

        // Success State - Profile Card
        return (
            <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                {/* Profile Image */}
                <div className="relative inline-block mb-4 w-full">
                    <img 
                        src={avatar_url || "https://via.placeholder.com/150"} 
                        alt={name}
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-orange-500 shadow-lg mx-auto object-cover"
                    />
                    <div className="absolute bottom-0 right-1/2 translate-x-12 sm:translate-x-16 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-4 border-white"></div>
                </div>
                
                {/* Name and Username */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 text-center break-words">{name}</h2>
                <a 
                    href={html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 font-medium mb-4 inline-block text-sm sm:text-base w-full text-center"
                >
                    @{login}
                </a>

                {/* Location */}
                <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm sm:text-base">{location || this.props.location || "India"}</span>
                </div>

                {/* Bio */}
                {bio && (
                    <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 italic text-center px-2">
                        {bio}
                    </p>
                )}

                {/* Company and Blog */}
                {(company || blog) && (
                    <div className="mb-4 sm:mb-6 space-y-2">
                        {company && (
                            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
                                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                                </svg>
                                <span className="break-words">{company}</span>
                            </div>
                        )}
                        {blog && (
                            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
                                <svg className="w-4 h-4 flex-shrink-0 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                                </svg>
                                <a 
                                    href={blog.startsWith('http') ? blog : `https://${blog}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-orange-600 hover:text-orange-700 break-all"
                                >
                                    {blog}
                                </a>
                            </div>
                        )}
                    </div>
                )}

                {/* GitHub Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-orange-50 rounded-lg p-2 sm:p-3">
                        <div className="text-lg sm:text-2xl font-bold text-orange-600">{public_repos}</div>
                        <div className="text-xs text-gray-600">Repos</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-2 sm:p-3">
                        <div className="text-lg sm:text-2xl font-bold text-blue-600">{followers}</div>
                        <div className="text-xs text-gray-600">Followers</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-2 sm:p-3">
                        <div className="text-lg sm:text-2xl font-bold text-purple-600">{following}</div>
                        <div className="text-xs text-gray-600">Following</div>
                    </div>
                </div>

                {/* GitHub Profile Button */}
                <a
                    href={html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block bg-orange-600 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg text-center text-sm sm:text-base"
                >
                    View GitHub Profile →
                </a>
            </div>
        )
    }
}

export default UserClass