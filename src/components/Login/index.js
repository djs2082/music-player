import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './index.css';
import { WEB_APP_URL } from '../../constants';
import Aws from '../../services/aws';
import { rakshaWords, dilipWords } from './config';
import detectivePng from './../../images/detective.png'
import raksha from './../../images/raksha.jpg'
import dj from './../../images/dj.jpg'
import PrimaryButton from '../Buttons/PrimaryButton';
import ConfirmModal from '../Modals/ConfirmModal';
import TextField from '@mui/material/TextField';
import SecondaryButton from '../Buttons/SecondaryButton';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const navigate = useNavigate();
  const [selectedPerson, setSelectedPerson] = useState(localStorage.getItem('appUser'));
  const whoIsThere = localStorage.getItem('appUser');
  const [message, setMessage] = useState("Who Is There?");
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState(null)
  const [showPassword, setShowPassword] = useState(false);
  const welcomeWord = (whoIsThere && whoIsThere === 'raksha') ? (rakshaWords[Math.floor(Math.random() * (rakshaWords.length))]) : (dilipWords[Math.floor(Math.random() * (dilipWords.length))])
  useEffect(() => {
    const awsObj = new Aws();
    awsObj.readConfig()
      .then((res) => {
        localStorage.setItem("config_data", res.Body);
        const expiresIn = localStorage.getItem("expiresIn");
        const issuedAt = localStorage.getItem("issuedAt");

        if (expiresIn && issuedAt) {
          const currentTime = Math.floor(Date.now() / 1000);
          if (currentTime <= (parseInt(issuedAt) + parseInt(expiresIn))) {
            navigate('/gallery')
          }
        }
        else {

          if (window.location.hash) {
            const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash);
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("tokenType", token_type);
            localStorage.setItem("expiresIn", expires_in);
            localStorage.setItem("issuedAt", Math.floor(Date.now() / 1000))
            navigate('/gallery')
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })

  }, [navigate])

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
    setShowModal(true);
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


  const onNext = () => {
    if (selectedPerson) {
      localStorage.setItem("appUser", selectedPerson);
      window.location.reload();
    }
    else {
      setMessage("Bachha, who are you?")
    }
  }

  const onSelect = (name) => {
    setSelectedPerson(name)
    if (name === 'raksha') setMessage('Ahhh! Missing Dilip!')
    if (name === 'dilip') setMessage('Ahhh! Missing Raksha!')
  }


  const verifyPassword = () => {
    if (selectedPerson === 'raksha') {
      if (password === process.env.REACT_APP_RAKSHA_SECRET_PASSWORD) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      if (password === process.env.REACT_APP_DILIP_SECRET_PASSWORD) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  return (
    <>
      <div class="login-page-wrapper">

        {whoIsThere ? (
          <div className="login-page"><PrimaryButton className="login-btn" onClick={handleLogin} >SignIn with Spotify</PrimaryButton>
            <div className="door">
              <div className="door-front">
                <div className="knob"></div>
              </div>
              <div className={`door-back ${localStorage.getItem('appUser') === 'raksha' ? 'welcome-dilip' : 'welcome-raksha'}`}>
                <div className="welcome-text">Hi {welcomeWord}!!</div>
              </div>
              <div className="door-mat"></div>
            </div >
            <div class="balloon"></div>
            <div class="balloon"></div>
            <div class="balloon"></div>
            <div class="balloon"></div>
            <div className="previous-page-arrow" onClick={() => { localStorage.removeItem("appUser"); window.location.reload() }}></div>
            <ConfirmModal style={{ width: "400px", height: "350px" }} show={showModal} onHide={() => setShowModal(false)} header="Confirm Your Identity!" body={<div><p>Please Confirm that you are {localStorage.getItem('appUser')} by Entering Secret Password</p>
              <TextField
                id="outlined-password-input"
                label="Secret Password"
                type={showPassword ? "text" : "password"}
                error={errorText}
                helperText={errorText}
                autoComplete="current-password"
                sx={{ width: "100%" }}
                onChange={(e) => { setErrorText(""); setPassword(e.target.value) }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              /></div>}
              primaryButton={
                <PrimaryButton onClick={() => {
                  if (verifyPassword()) {
                    window.location = loginUrl
                  }
                  else {
                    setErrorText("Incorrect Login Password");
                  }
                }}>Confirm</PrimaryButton>
              }
              secondaryButton={
                <SecondaryButton onClick={() => setShowModal(false)}>
                  Cancel
                </SecondaryButton>
              }
            />
          </div>) : (<><div className='person-wrapper'>
            <div onClick={() => onSelect("raksha")}>
              <img className={`person ${(selectedPerson === 'raksha') ? 'selected' : ''}`} src={raksha} alt=""></img>
              <div className="person-msg">Raksha</div>
            </div>
            <div onClick={() => onSelect("dilip")}>
              <img className={`person ${(selectedPerson === 'dilip') ? 'selected' : ''}`} src={dj} alt=""></img>
              <div className="person-msg">Dilip</div>
            </div>
          </div>
            <div>
              <img className="detective-img" src={detectivePng} alt=""></img>
              <div className="detective-msg">{message}</div>
            </div>
            <div className="next-page-arrow" onClick={onNext}></div></>)
        }
      </div >

    </>
  )
}
export default Login;