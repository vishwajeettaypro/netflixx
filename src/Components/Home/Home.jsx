import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import "./Home.scss";
import axios from "axios";
import { BiPlay } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';

const apiKey = 'ec915dfd98b8f64885b4f22a398c698b';
const url = 'https://api.themoviedb.org/3';
const imgUrl = 'https://image.tmdb.org/t/p/original';
const upcoming = 'upcoming';
const NowPlaying = 'now_playing';
const Popular = "popular";
// const TopRated = "top_rated";
const TopRated = 'top_rated';

// Card component to render individual movie posters
const Card = ({ img }) => (
    <div className="card">
        <img src={img} alt="cover" />
    </div>
);

// Row component to render a list of movies
const Row = ({ title, arr = [] }) => (
    <div className="row">
        <h2>{title}</h2>
        <div>
            {arr.length === 0 ? (
                <p>No Movies Available</p> // Show if there are no movies
            ) : (
                arr.map((item, index) => (
                    <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
                ))
            )}
        </div>
    </div>
);

const Home = () => {
    const [UpcomingMovies, setUpcomingMovies] = useState([]);
    const [NowPlayingMovies, setNowPlaying] = useState([]);
    const [PopularMovies, setPopular] = useState([]);
    const [TopRatedMovies, setTopRated] = useState([]);
    const [GenresList, setGenresList] = useState([]); 

    // Disable the ESLint warning for missing dependency (TopRatedMovies)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const fetchUpcoming = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
            setUpcomingMovies(results);
            // console.log(results);
            
        };

        const fetchNowPlaying = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${NowPlaying}?api_key=${apiKey}`);
            setNowPlaying(results);
        };

        const fetchPopular = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${Popular}?api_key=${apiKey}`);
            setPopular(results);
        };

        const fetchTopRated = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${TopRated}?api_key=${apiKey}`);
            setTopRated(results);
        };
        
        

        const getAllGenres = async () => {
            const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
            setGenresList(genres);
        };

        fetchUpcoming();
        fetchNowPlaying();
        fetchPopular();
        fetchTopRated();
        getAllGenres();
    }, []); // Empty dependency array, runs once on mount

    return (
        <section className="home">
            <div className="banner" style={{
                backgroundImage: PopularMovies[0] ? `url(${imgUrl}/${PopularMovies[0].poster_path})` : 'none',
            }}>
                {PopularMovies[0] && (
                    <>
                        <h1>{PopularMovies[0].original_title}</h1>
                        <p>{PopularMovies[0].overview}</p>
                        <div className="button-container">
                        <button><BiPlay /> Play </button>
                        <button>My List<AiOutlinePlus /></button>
                        </div>
                    </>
                )}
            </div>

            <Row title={"Upcoming Movies"} arr={UpcomingMovies} />
            <Row title={"Now Playing"} arr={NowPlayingMovies} />
            <Row title={"Popular"} arr={PopularMovies} />
            <Row title={"Top Rated"} arr={TopRatedMovies.length > 0 ? TopRatedMovies : []} />

            <div className="genreBox">
                {GenresList.map((item) => (
                    <Link key={item.id} to={`./genre/${item.id}`}>
                        {item.name}
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Home;
