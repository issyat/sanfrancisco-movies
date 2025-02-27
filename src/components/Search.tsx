import { useEffect, useState } from 'react';
import moviesData from '../data.json'
import { Grid2 as Grid, List, ListItem, ListItemButton, TextField } from '@mui/material';


const Search = ({ onItemSelect, searchTerm, searchResults, handleChange }:any) => {



    return (
        <Grid>
            <TextField
                id="outlined-basic"
                label="Movies"
                variant="outlined"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
            />

            <List sx={{overflowY: 'auto', maxHeight: '100vh'}}>
                {searchResults.map((item:any, index:number) => (
                    <ListItem onClick={() => onItemSelect(item)}>
                        <ListItemButton key={index}>{item.title}</ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Grid>
    );
}
export default Search;