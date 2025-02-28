import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import moviesData from '../data.json'
import { Grid2 as Grid, Typography } from '@mui/material';
import Search from './Search';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

const MapUpdater = ({ marker }: { marker: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(marker, 13);
    }, [marker, map]);
    return null;
};

const Map = () => {
    const [movies, setMovies] = useState(moviesData);
    const [marker, setMarker] = useState<[number, number]>([parseFloat(moviesData[0].lat), parseFloat(moviesData[0].lng)]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<typeof moviesData>([]);

    // Ref to store marker instances
    const markerRefs = useRef<L.Marker[]>([]);

    const handleChange = (event: any) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        if (searchTerm === '') {
            // Reset to initial state
            setMovies(moviesData);
            setMarker([parseFloat(moviesData[0].lat), parseFloat(moviesData[0].lng)]);

            // Close all popups
            markerRefs.current.forEach(marker => marker?.closePopup());
            setSearchResults([]);
        } else {
            const results = moviesData.filter((movie) => {
                if (!movie.title) return false;
                return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
            }).filter((value, index, self) => self.findIndex((t) => t.title === value.title) === index);

            setSearchResults(results);
        }
    }, [searchTerm]);

    const handleSelectedMovie = (movie: any) => {
        const searchedMovies = moviesData.filter((item) => item.title === movie.title);
        setMarker([parseFloat(searchedMovies[0].lat), parseFloat(searchedMovies[0].lng)]);
        setMovies(searchedMovies);

        // Close all popups when selecting a new movie
        markerRefs.current.forEach(marker => marker?.closePopup());
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={6}>
                    <Search onItemSelect={handleSelectedMovie} searchTerm={searchTerm} searchResults={searchResults} handleChange={handleChange} />
                </Grid>
                <Grid size={6}>
                    <MapContainer center={marker} zoom={13} scrollWheelZoom={false} style={{ height: "100vh", width: "100%" }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapUpdater marker={marker} />
                        {movies.map((movie, index) => (
                            <Marker
                                key={index}
                                position={[parseFloat(movie.lat), parseFloat(movie.lng)]}
                                ref={(el) => {
                                    if (el) markerRefs.current[index] = el;
                                }}
                            >
                                <Popup>
                                    <Typography variant='h4'>{movie.title}</Typography>
                                    <Typography variant='body1'>Year: {movie.release_year}</Typography>
                                    <Typography variant='body1'>Director: {movie.director}</Typography>
                                    <Typography variant='body1'>Actors: {movie.actor_1}, {movie.actor_2}, {movie.actor_3}</Typography>
                                    <Typography variant='body1'>Locations: {movie.locations}</Typography>
                                    {movie.fun_facts && <Typography variant='body1'>Fun Facts: {movie.fun_facts}</Typography>}
                                    <Typography variant='body1'>Production Company: {movie.production_company}</Typography>
                                    <Typography variant='body1'>Distributor: {movie.distributor}</Typography>
                                    <Typography variant='body1'>Writer: {movie.writer}</Typography>
                                    <Typography variant='body1'>Location: {movie.locations}</Typography>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </Grid>
            </Grid>
        </>
    );
};

export default Map;
