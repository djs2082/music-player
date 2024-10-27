import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './index.css';
import { SERVER_URL, WEB_APP_URL } from '../../constants';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  useEffect(() => {

    const expiresIn = localStorage.getItem("expiresIn");
    const issuedAt = localStorage.getItem("issuedAt");
    console.log(expiresIn, issuedAt)
    if (expiresIn && issuedAt) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime <= (parseInt(issuedAt) + parseInt(expiresIn))) {
        navigate('/gallery')
      }
      else {
        localStorage.clear();
      }
    }
    else {

      if (window.location.hash) {
        const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash);
        localStorage.clear();
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("tokenType", token_type);
        localStorage.setItem("expiresIn", expires_in);
        localStorage.setItem("issuedAt", Math.floor(Date.now() / 1000))
        navigate('/gallery')
      }
    }
  }, [])

  const spotifyLoginEndPoint = "https://accounts.spotify.com/authorize";
  const redirectUrl = WEB_APP_URL
  const clientId = "912ef809e5244d4394e52b7dfced0c92"

  const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state"
  ]

  const loginUrl = `${spotifyLoginEndPoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`

  const handleLogin = () => {
    window.location = loginUrl
  }

  const getReturnedParamsFromSpotifyAuth = (hash) => {
    const hashString = hash.toString();
    const paramsUrl = hashString.split("&")
    const paramsSplitUp = paramsUrl.reduce((accumulator, currentValue) => {
      const [key, value] = currentValue.split("=");
      accumulator[key.replace("#", "")] = value;
      return accumulator;
    }, {})
    return paramsSplitUp;
  }

  const onSubmit = (e) => {
    console.log(userName, password)
    e.preventDefault();

    axios.post(`${SERVER_URL}/api/token/`, { username: userName, password })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          sessionStorage.setItem('access_token', response.data.access);
          navigate('/gallery')
        }
      })
      .catch(error => {
        console.log(error.toString())
      });



  }

  const onSpotifyLogin = () => {
    axios.post(`${SERVER_URL}images/auth`)

  }

  return (
    <div class="login-page">
      {/* <div class="form">
        <form class="login-form" onSubmit={onSubmit}>
          <input type="text" onChange={(e) => setUserName(e.target.value)} placeholder="username" />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
          <button>login</button>
        </form>
      </div> */}
      <button onClick={handleLogin} >SignIn with Spotify</button>
    </div>
  )
}
export default Login;