import React, { useEffect } from 'react'
import styled from 'styled-components'
import {AiFillClockCircle} from "react-icons/ai"
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constant'
const Body = ({headerBackground}) => {
  const [{token, selectedPlaylist, selectedPlaylistId}, dispatch] = useStateProvider()
  useEffect(() => {
   const getInitialPlaylist = async () => {
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }
    })
    console.log(response.data)
    const selectedPlaylist = {
      id: response.data.id,
      name: response.data.name,
      description: response.data.description,
      image: response.data.images[0].url,
      tracks: response.data.tracks.items.map(({track}) => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map((artist) => artist.name),
        image: track.album.images[2].url,
        duration: track.duration_ms,
        album: track.album.name,
        context_uri: track.album.uri,
        track_number: track.track_number,
      })),
    }
    console.log(selectedPlaylist)
    dispatch({type: reducerCases.SET_TRACK, selectedPlaylist})
   }
    getInitialPlaylist()
  }, [token, dispatch, selectedPlaylistId])
  const msToMinutesAndSecs = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = ((ms % 60000) / 1000).toFixed(0)
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
  }
  const playTrack = async (id, name, artists, image, context_uri, track_number) => {
    console.log(name)
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri: context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      }, 
      {
      headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
      },
   })
   console.log(response)
   if (response.status === 204) {
     const currentlyPlaying = {
      id,
      name,
      artists,
      image,
     }
     dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying})
     dispatch({type: reducerCases.SET_PLAYSTATE, playerState: true})
   }
   else {
    dispatch({type: reducerCases.SET_PLAYSTATE, playerState: true})
   }
  }
  return (
    <Container headerBackground = {headerBackground}>
      {
        selectedPlaylist && (
          <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="" />
            </div>
            <div className="details">
              <span className='type'>PLAYLIST</span>
              <div className="title">{selectedPlaylist.name}</div>
              <p className = "description">{selectedPlaylist.description}</p>
            </div>
          </div>
            <div className="list">
              <div className="header__row">
                <div className="col">
                  <span>#</span>
                </div>
                <div className="col">
                  <span>TITLE</span>
                </div>
                <div className="col">
                  <span>ALBUM</span>
                </div>
                <div className="col">
                  <span><AiFillClockCircle/></span>
                </div>
              </div>
              <div className="tracks">
                {
                  selectedPlaylist.tracks.map(({id, name, artists, album, context_uri,track_number, image, duration}, index) => {
                    return (
                      <div className="row" key = {id} onClick = {() => {console.log(artists);playTrack(id, name, artists, image, context_uri, track_number)}}>
                        <div className="col">
                          <span>{index+1}</span>
                        </div>
                        <div className="col detail">
                         <div className="image">
                         <img src={image} alt="track" />
                         </div>
                            <div className="info">
                             <span className='name'>{name}</span>
                             <span className = "artists">{artists.join(", ")}</span>
                            </div>
                        </div>
                        <div className="col">
                          <span>{album}</span>
                        </div>
                        <div className="col">
                          <span>{msToMinutesAndSecs(duration)}</span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </>
        )
      }
    </Container>
  )
}
const Container = styled.div`
.playlist {
  margin: 0 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  .image {
    img {
      height: 15rem;
      box-shadow: rgba(0,0,0,0.1) 0px 25px 50px -12px;
    }
  }
  .details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: #e0dede;
    .title {
      color: white;
      font-size: 4rem;
    }
  }
}
.list {
  .header__row {
    display: grid;
    grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
    color: #dddcdc;
    margin: 1rem 0 0 0;
    position: sticky;
    top: 15vh;
    padding: 1rem 3rem;
    transition: 0.3s ease-in-out;
    background-color: ${({headerBackground}) => headerBackground ? "#000000dc" : "none"};
  }
  .tracks {
    margin: 0 2rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 5rem;
    .row {
      padding: 0.5rem 1rem;
      display: grid;
      cursor: pointer;
      grid-template-columns: 0.3fr 3.1fr 1.9fr 0.1fr;
      &:hover {
        background-color: rgba(0,0,0, 0.7);
      }
      .col {
        display: flex;
        align-items: center;
        color: #dddcdc;
        img {
          height: 40px;
        }
      }
      .detail {
         display: flex;
         gap: 1rem;
         .info {
          display: flex;
          flex-direction: column;
      }
    }
  }
}
}
`
export default Body
