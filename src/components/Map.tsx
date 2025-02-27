import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import '../assets/styles/map.css'
import moviesData from '../data.json'
import { Grid2 as Grid, Typography } from '@mui/material';
import Search from './Search';
import {  useEffect, useRef, useState } from 'react';
import { Icon } from 'leaflet';

const Map = () => {
    const [movies, setMovies] = useState(moviesData);
    const [marker, setMarker] = useState<[number, number]>([parseInt(moviesData[0].lat), parseInt(moviesData[0].lng)]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<typeof moviesData>([]);


    const popupRef = useRef<any>(null);
    const handleChange = (event: any) => {
        setSearchTerm(event.target.value);
    }

    useEffect(() => {
        if (searchTerm === '') {
            setMovies(moviesData);
            if (popupRef.current) {
                popupRef.current.closePopup();
            }
          }

        const results = moviesData
            .filter((movie) => {
                if (!movie.title) return false;
                return searchTerm !== '' ? movie.title.toLowerCase().includes(searchTerm.toLowerCase()) : null;
            })
            .filter((value, index, self) => {
                return self.findIndex((t) => t.title === value.title) === index;
            });

        setSearchResults(results);
       
    }, [searchTerm]);


    const handleSelectedMovie = (movie: any) => {
        const searchedMovies = moviesData.filter((item) => item.title === movie.title);
        setMarker([parseInt(searchedMovies[0].lat), parseInt(searchedMovies[0].lng)]);
        setMovies(searchedMovies);
    }


    return (
        <>
            <Grid container>
                <Grid size={6}>
                    <Search onItemSelect={handleSelectedMovie} searchTerm={searchTerm} searchResults={searchResults} handleChange={handleChange} />
                </Grid>
                <Grid size={6}>
                    <MapContainer center={[37.773972, -122.431297]} zoom={5} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        
                        {movies.map((movie, index) => (
                                <Marker key={index} position={[parseFloat(movie.lat), parseFloat(movie.lng)]}>
                                    <Popup ref={popupRef}>
                                        <Typography component={"h1"} variant='h4'>{movie.title}</Typography>
                                        <Grid>
                                            <Typography component={"p"} variant='body1'>Year: {movie.release_year}</Typography>
                                            <Typography component={"p"} variant='body1'>Director: {movie.director}</Typography>
                                            <Typography component={"p"} variant='body1'>Actors: {movie.actor_1}, {movie.actor_2}, {movie.actor_3}</Typography>
                                            <Typography component={"p"} variant='body1'>Locations: {movie.locations}</Typography>
                                            {movie.fun_facts && <Typography component={"p"} variant='body1'>Fun Facts: {movie.fun_facts}</Typography>}
                                            <Typography component={"p"} variant='body1'>Production Company: {movie.production_company}</Typography>
                                            <Typography component={"p"} variant='body1'>Distributor: {movie.distributor}</Typography>
                                            <Typography component={"p"} variant='body1'>Writer: {movie.writer}</Typography>
                                            <Typography component={"p"} variant='body1'>Location: {movie.locations}</Typography>
                                        </Grid>
                                    </Popup>
                                </Marker>
                            )
                        )}
                    
                    </MapContainer>,
                </Grid>
            </Grid>

        </>
    );
};

export default Map;