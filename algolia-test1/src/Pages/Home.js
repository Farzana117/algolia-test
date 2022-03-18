import React, { useEffect, useState } from "react";
import Movies from "../assets/movies.json";
import TextField from "@mui/material/TextField";

const Home = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        let movieList = []
        Object.values(Movies).forEach(({ hits }) => {
            hits.forEach(({ title, year, cast, genres, objectID, _rankingInfo }) => {
                movieList.push({
                    title, year, cast, genres, objectID, userScore: _rankingInfo.userScore
                })
            })
        })
        setMovies(movieList);
    }, []);
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        //converting the input to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    const filteredData = movies.filter((el) => {
        //if no input then return the original
        if (inputText === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.title.toLowerCase().includes(inputText)
        }
    })
    return (
        <div>
            <h1>Filtered Search Functionality in React</h1>
            <div className="search" style={{ width: '500px', margin: 'auto' }}>
                <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Search here"
                />
            </div>
            {filteredData.map(({ title , year , cast}) => {
                return <section style={{border:'1px solid black',margin:'15px',width:'500px',display:'inline-block',borderRadius:'5px',backgroundColor:'skyblue',color:"black",padding:'15px 0'}}><h3>Title : {title}</h3><h3>Year : {year}</h3><h3>Cast : {cast.map((x,i)=>{ return i==0 && cast.length>1 ? x+' , ' : x})}</h3></section>
            })}
        </div>
    )
}
export default Home;