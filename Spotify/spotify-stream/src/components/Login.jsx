import React from 'react'
import styled from 'styled-components'
const Login = () => {
  const handleClick = () => {
    const clientID = '99659f9d41734d9dbe961f859d10dcf3';
    const redirectURL = 'http://localhost:3000/'
    const apiURL = 'https://accounts.spotify.com/authorize'
    const scope = [
      'user-read-email',
      'user-read-private',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
       'user-read-playback-position',
       'user-top-read',
       'user-read-recently-played',
    ]
    window.location.href = `${apiURL}?client_id=${clientID}&redirect_uri=${redirectURL}&scope=${scope.join(" ")}
    &response_type=token&show_dialog=true`
  }
  return (
   <Container>
    <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="" />
    <button onClick={handleClick}>Connect Spotify</button>
   </Container>
  )
}
const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
width: 100vw;
background-color: #1db954;
gap: 5rem;
img {
  height: 20vh;
}
button {
  padding: 1rem 5rem;
  border-radius: 5rem;
  border: none;
  background-color: black;
  color: #49f585;
  font-size: 1.4rem;
  cursor: pointer;
}
`
export default Login