import React, {useState, useEffect} from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import {useParams} from 'react-router-dom';
import api from '../../api';
import SideBar from '../SideBar/SideBar';




function Live(){


    let {slug} = useParams();
    console.log(slug);

    const [infoStream, setInfoStream] = useState([]);
    const [infoGame, setInfoGame] = useState([]);

    useEffect(() => {

        const fetchData = async () => {

            const result = await api.get(`https://api.twitch.tv/helix/streams?user_login=${slug}`)
            // console.log(result);
            
            if(result.data.data.length === 0) {
                setInfoStream(false)
            } else {

                
                let gameID = result.data.data.map(gameid => {
                    return gameid.game_id;
                })
                
                const resultNomGame = await api.get(`https://api.twitch.tv/helix/games?id=${gameID}`)
                // console.log(resultNomGame);
                
                let nomJeu = resultNomGame.data.data.map(gameName => {
                    return gameName.name;
                })
                
                
                setInfoGame(nomJeu)
                setInfoStream(result.data.data[0])
            }
        }

        fetchData();

    }, [slug])



    return (

        infoStream  ?

        <div>
             <SideBar />
                <div className="containerDecale">
                    <ReactTwitchEmbedVideo height="754" width="100%" channel={slug}/>
                    <div className="contInfo">
                        <div className="titreStream">{infoStream.title}</div>
                        <div className="viewer">Viewers : {infoStream.viewer_count}</div>
                        <div className="infogame">Streamer : {infoStream.user_name}, &nbsp; Language : {infoStream.language}</div>
                        <div className="nomJeu">Game : {infoGame}</div>
                    </div>
                </div>
        </div>

        :
        <div>
            <SideBar />
                <div className="containerDecale">
                    <ReactTwitchEmbedVideo height="754" width="100%" channel={slug}/>
                    <div className="contInfo">
                        <div className="titreStream">Streamer is offline ! </div>
                    </div>
                </div>
        </div>
    )

};

export default Live;