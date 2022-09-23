import { createContext, useContext, useState, useEffect } from 'react'

export const MusicContext = createContext()

export const useMusic = () => useContext(MusicContext);

export default function MusicProvider({ children }){

    const [playerSong, setPlayerSong] = useState("")

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
