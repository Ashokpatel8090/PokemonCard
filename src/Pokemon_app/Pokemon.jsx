import { useEffect } from 'react'
import './pokemon.css'
import { useState } from 'react'
import { PokemonCards } from './PokemonCards';

export const Pokemon = () =>{

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const API = "https://pokeapi.co/api/v2/pokemon?limit=100"

    const fetchPokemon = async() =>{
        try{
            const res = await fetch(API);
            const data = await res.json();
            console.log(data);

            const datailPokemonData = data.results.map( async (curPokemon) =>{
                // console.log(curPokemon.url,"::", curPokemon.name);
                const res = await fetch(curPokemon.url);
                const data = await res.json();
                return data;
                
                
            })
            // console.log(datailPokemonData);

            const detailedResponses = await Promise.all(datailPokemonData)
            console.log(detailedResponses);
            setPokemon(detailedResponses);
            setLoading(false);

        }catch(error){
            console.log(error);
            setLoading(false);
            setError(error);
            
        }
    }

    useEffect(() =>{
        fetchPokemon();
    }
    ,[])

    //search functionality
    const searchData = pokemon.filter((curPokemon) => curPokemon.name.toLowerCase().includes(search.toLowerCase()));

    if(loading){
        return(
            <div>
                <h1>Loading.......</h1>
            </div>
        )
    }
    
    if(error){
        return(
            <div>
                <h1>{error.message}</h1>
            </div>
        )
    }
    
    return(
        <>
            <section className="container">
                <header>
                    <h1>Lets Catch Pokemon</h1>
                </header>
                <div className="pokemon-search">
                    <input type="text" placeholder='search pokemon' value={search} onChange={(e) => setSearch(e.target.value) }/>
                </div>
                <div>
                    <ul className='cards'>
                        {searchData.map((curPokemon) =>{
                           return(
                            <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
                           )
                        })}
                    </ul>
                </div>
            </section>
        </>
    )
}