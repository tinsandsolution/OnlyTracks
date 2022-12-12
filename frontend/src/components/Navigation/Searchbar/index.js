import React, { useEffect, useState } from "react";
import './Searchbar.css'
import { useHistory} from "react-router-dom";


function Searchbar() {
    const [searchPhrase, setSearchPhrase] = useState("")
    const [isActive, setIsActive] = useState(false)
    const history = useHistory()

    return (
        <form
          className='search-form'
          id={isActive ? "search-form-active" : ""}
          onSubmit={(e) => {
            e.preventDefault()
            history.push(`/search?q=${searchPhrase}`)
          }}
        >
            <div className='search-magnifying-glass'>
                <i className="fa-solid fa-magnifying-glass" id="search-icon-color"></i>
            </div>
            <input
                type="text"
                className="search-textfield"
                value={searchPhrase}
                placeholder= {searchPhrase}
                onFocus = {(e) => {setIsActive(true)}}
                onBlur = {(e) => {setIsActive(false)}}
                onChange={(e) => {setSearchPhrase(e.target.value)}}>
            </input>
        </form>
    )

}

export default Searchbar
