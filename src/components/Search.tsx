import { Grid2 as Grid, List, ListItem, ListItemButton, TextField } from '@mui/material';


const Search = ({ onItemSelect, searchTerm, searchResults, handleChange }: any) => {



    return (
        <Grid display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <TextField
                id="outlined-basic"
                label="Movies"
                variant="outlined"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
                sx={{ width: '100%' }}
            />
            <Grid sx={{overflowY: 'auto', maxHeight: '100vh', width: '100%'}}>
                <List sx={{ width: '100%' }}>
                    {searchResults.map((item: any, index: number) => (
                        <ListItem onClick={() => onItemSelect(item)}>
                            <ListItemButton key={index}>{item.title}</ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    );
}
export default Search;