import React, {Component} from 'react'
import SearchBar from '../components/search-bar'
import VideoList from './video-list'
import VideoDetail from '../components/video-detail'
import axios from 'axios'

const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = "api_key=7dca21fe02caa7ab3342dcfecd943c8e"

class App extends Component {

	constructor(props){
		super(props)
		this.state = {
			movieList:{},
			currentMovie:{}
		}
	}

	componentWillMount() {
		this.initMovies();
	}

	//Recup du film le plus populaire et des 5 plus populaires suivants
	initMovies(){
		axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`)
		.then(function(response){
			this.setState({movieList:response.data.results.slice(1,6),currentMovie:response.data.results[0]});
		}.bind(this));
	}

	render() {

		//Vérifier si requête terminée avant d'afficher les films
		const renderVideoList = () => {
			if(this.state.movieList.length >= 5){
				return <VideoList movieList={this.state.movieList}/>
			}
		}
		return (
			<div>
				<SearchBar/>
				{renderVideoList()}
				<VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview}/>
			</div>
		);
	} 
}

export default App;