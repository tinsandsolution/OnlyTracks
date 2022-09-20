import { createContext, useContext, useState, useEffect } from 'react'

export const MusicContext = createContext()

export const useMusic = () => useContext(MusicContext);

export default function MusicProvider({ children }){

    const [playerSong, setPlayerSong] = useState("https://cdn.discordapp.com/attachments/1017492963720433868/1021868528242003968/Speak_Of_The_Bass.mp3")

    useEffect(()=>{
      console.log("song changed")
    },[playerSong])

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
