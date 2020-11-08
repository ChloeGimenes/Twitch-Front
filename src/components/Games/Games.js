import React, { useState, useEffect} from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';


function Games () {

/* GET TOP GAMES FROM API */
    const [games, setGames] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            const result = await api.get('https://api.twitch.tv/helix/games/top')
            console.log(result)

            let dataArray = result.data.data;
            let finalArray = dataArray.map(game => {
                let newUrl = game.box_art_url
                    .replace("{width}", "250")
                    .replace("{height}", "300");
            game.box_art_url = newUrl;
            return game ;
            });


            setGames(finalArray)
        }

        fetchData();

    }, [])

    console.log(games)


    return ( 
        <div>
            <SideBar />
            <h1 className="titreGames">Popular games</h1>
            <div className="flexAccueil">
                {games.map((game, index) => (

                    <div key={index} className="cartesGames">
                             <img src={game.box_art_url} alt="jeu profile pic" className="imgCarte" />
                        <div className="cardBodyGames" >
                            <h5 className="titreCartesGames">{game.name}</h5>

                            <Link
                                className="lien"
                                to={{
                                    pathname: "game/" + game.name,
                                    state: {
                                        gameID: game.id
                                    }
                                }}
                                >
                                <div className="btnCarte">Watch {game.name}</div>
                                </Link>
                            </div>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default Games;