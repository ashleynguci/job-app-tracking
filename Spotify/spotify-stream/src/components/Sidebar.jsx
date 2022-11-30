import React from 'react'
import styled from 'styled-components'
import {IoLibrary} from "react-icons/io5"
import {MdHomeFilled, MdSearch} from "react-icons/md"
import Playlist from './Playlist'
const Sidebar = () => {
  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt="" />
        </div>
        <ul>
          <li>
            <MdHomeFilled/>
            <span>Home</span>
          </li>
          <li>
            <MdSearch/>
            <span>Search</span>
          </li>
          <li>
            <IoLibrary/>
            <span>Your library</span>
          </li>
        </ul>
      </div>
      <Playlist/>
    </Container>
  )
}
const Container = styled.div`
background-color: black;
color: #b3b3b3;
display: flex;
flex-direction: column;
height: 100%;
width: 100%;
.top__links {
  display: flex;
  flex-direction: column; 
  .logo {
    text-align: center;
    margin: 1rem 0;
    img {
      max-inline-size: 100%;
      block-size: auto;
    }

  }
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column; 
    gap: 1rem;
    padding: 1rem;
    li {
     display: flex;
     gap: 1rem;
     cursor: pointer;
     transition: 0.3s ease-in-out;
     &:hover {
      color: white;
     }
    }
    
  }
}
`
export default Sidebar