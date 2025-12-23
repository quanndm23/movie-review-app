
import React, { useEffect, useState } from 'react';
import { getTrendingMovies, getTopRatedMovies, getPopularMovies } from '../../api/endpoints';
import { useGenreMovies } from '../../hooks/useGenreMovies';
import MovieSection from '../../components/MovieSection/MovieSection';
import { Movie, ApiResponse } from '../../types/movie.types';
import Footer from '../../components/Footer/Footer';

const Home: React.FC = () => {
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [loadingTrending, setLoadingTrending] = useState(true);
    const [loadingTopRated, setLoadingTopRated] = useState(true);
    const [loadingPopular, setLoadingPopular] = useState(true);
    const { genreSections, overallLoading: genreLoading } = useGenreMovies();

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            // Fetch trending movies
            getTrendingMovies('week')
                .then((response: ApiResponse<Movie>) => {
                    setTrendingMovies(response.results);
                    setLoadingTrending(false);
                })
                .catch(err => {
                    console.error('Error fetching trending movies:', err);
                    setLoadingTrending(false);
                });

            // Fetch top rated movies
            getTopRatedMovies(1)
                .then((response: ApiResponse<Movie>) => {
                    setTopRatedMovies(response.results);
                    setLoadingTopRated(false);
                })
                .catch(err => {
                    console.error('Error fetching top rated movies:', err);
                    setLoadingTopRated(false);
                });

            // Fetch popular movies
            getPopularMovies(1)
                .then((response: ApiResponse<Movie>) => {
                    setPopularMovies(response.results);
                    setLoadingPopular(false);
                })
                .catch(err => {
                    console.error('Error fetching popular movies:', err);
                    setLoadingPopular(false);
                });
        } catch (err) {
            console.error('Error fetching initial data:', err);
        }
    };

    return (
        <div className="min-h-screen bg-imdb-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Trending Section */}
                <div className="py-12">
                    <MovieSection
                        title="🔥 Trending This Week"
                        movies={trendingMovies}
                        loading={loadingTrending}
                    />
                </div>

                {/* Top Rated Section */}
                <div className="py-12 border-t border-gray-700">
                    <MovieSection
                        title="⭐ Top Rated Movies"
                        movies={topRatedMovies}
                        loading={loadingTopRated}
                    />
                </div>

                {/* Popular Interests Section */}
                <div className="py-12 border-t border-gray-700">
                    <MovieSection
                        title="🎯 Popular Interests"
                        movies={popularMovies}
                        loading={loadingPopular}
                    />
                </div>

                {/* Genre-Based Sections */}
                {!genreLoading && genreSections.map((genre) => (
                    <div key={genre.id} className="py-12 border-t border-gray-700">
                        <MovieSection
                            title={`${genre.emoji} ${genre.name}`}
                            movies={genre.movies}
                            loading={genre.loading}
                        />
                    </div>
                ))}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
