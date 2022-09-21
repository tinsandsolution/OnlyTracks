import { createContext, useContext, useState, useEffect } from 'react'

export const MusicContext = createContext()

export const useMusic = () => useContext(MusicContext);

export default function MusicProvider({ children }){

    const [playerSong, setPlayerSong] = useState("https://cdn.discordapp.com/attachments/1017492963720433868/1021902188315934780/Never_Gonna_Give_You_Up_Original.mp3")

    // useEffect(()=>{
    //   console.log("song changed")
    // },[playerSong])

    return (
        <MusicContext.Provider
          value={{
            playerSong,
            setPlayerSong,
          }}
        >
          {children}
        </MusicContext.Provider>
      );
}
