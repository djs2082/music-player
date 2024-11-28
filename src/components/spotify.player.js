import React, { useState, useEffect } from 'react';

const SpotifyPlayer = (props) => {
  /* eslint-disable no-unused-vars */
  const [song, setSong] = useState(null);


  function triggerCustomClick(song) {
    const element = document.getElementById('embed-wrapper');
    const customEvent = new CustomEvent('customClick', {
      detail: { song }
    });
    element.dispatchEvent(customEvent);
  }


  useEffect(() => {
    const tracks = localStorage.getItem('tracks');
    const parsedTracks = JSON.parse(tracks);
    if (parsedTracks) {
      const index = Math.floor(Math.random() * (parsedTracks?.length - 0) + 0);
      const songId = props.songId?.song || parsedTracks[index]
      setSong(songId);


      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        const element = document.getElementById(`embed-iframe`);
        const options = {
          uri: `spotify:track:${songId?.track}`,
          height: '100%',
          autoPlay: 'true'
        };
        const callback = (EmbedController) => {
          console.log("here")
          EmbedController.play();
          console.log(EmbedController)
          // EmbedController?.connect()?.then(() => {
          //   console.log('Spotify Player connected');
          // });
          // EmbedController?.contentWindow?.postMessage(
          //   {
          //     method: 'play',
          //   },
          //   '*'
          // );


          document.getElementById('embed-wrapper').addEventListener('customClick', function (event) {
            console.log(event)
            const { song } = event.detail;
            // Execute your logic with param1 and param2
            if (!song) {
              const songs = localStorage.getItem('tracks')
              const parsedSongs = JSON.parse(songs);
              const index = Math.floor(Math.random() * (parsedSongs.length - 0) + 0);
              const songId = parsedSongs[index]
              EmbedController.loadUri(`spotify:track:${songId.track}`)
              // EmbedController.play();
              // EmbedController.addEventListener('click', () => {
              //   EmbedController.contentWindow.postMessage(
              //     {
              //       method: 'play',
              //     },
              //     '*'
              //   );
              // })
              // EmbedController.addEventListener('ready', () => {
              //   // alert("Embed is ready!");
              //   console.log(EmbedController)
              //   EmbedController.play();
              // });
            }
            else {
              EmbedController.loadUri(`spotify:track:${song.track}`)
              // EmbedController.play();
              // EmbedController.onPlaybackUpdate(() => { })
              EmbedController.on('error', (err, a) => {
                console.log("whant now")
              })

              // EmbedController.addListener('ready', () => {
              //   EmbedController.contentWindow.postMessage(
              //     {
              //       method: 'play',
              //     },
              //     '*'
              //   );
              // })
              EmbedController.addListener('ready', (err, a) => {
                console.error("error")
                console.log(EmbedController)
                // try {
                EmbedController.play()
                // }
                // catch (error) {
                //   console.log(error)
                // }
              });
            }
          });



          // document.getElementById('embed-wrapper').addEventListener('click', () => {
          //   console.log("change song now")
          //   console.log(song);
          //   if (!song) {
          //     const songs = localStorage.getItem('tracks')
          //     const parsedSongs = JSON.parse(songs);
          //     const index = Math.floor(Math.random() * (parsedSongs.length - 0) + 0);
          //     console.log(parsedSongs)
          //     const songId = parsedSongs[index]
          //     console.log(songId);
          //     EmbedController.loadUri(`spotify:track:${songId.track}`)
          //     EmbedController.play();
          //   }
          //   else {
          //     EmbedController.loadUri(`spotify:track:${song.track}`)
          //     EmbedController.play();
          //   }

          // })
        };
        const newElement = document.getElementById(`embed-wrapper`);
        console.log(newElement)
        if (!element) {
          const childDiv = document.createElement('div');
          childDiv.id = 'embed-iframe';
          console.log(childDiv, options)
          IFrameAPI.createController(childDiv, options, callback)

        }
        else {
          console.log(element)
          IFrameAPI.createController(element, options, callback)

        }
      }
    };
  }, [props.songId])

  useEffect(() => {

    setSong(props.songId?.song);
    // document.getElementById('embed-wrapper').click();
    triggerCustomClick(props.songId?.song);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.songCount])

  return (
    <>
      {/* <div className="arrow"></div> */}
      {/* <Media queries={{ mobile: "(max-width: 600px)" }}>
        {(matches) => <>{matches.mobile && <div className="arrow"></div>}</>}
      </Media> */}
      <div id="embed-wrapper" style={{ height: "20vh" }} >
        <div id='embed-iframe'></div>
      </div>
    </>


  )
}
export default SpotifyPlayer;