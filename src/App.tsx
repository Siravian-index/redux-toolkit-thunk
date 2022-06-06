import './App.css'
import { useSelector} from "react-redux";
import {addUser, getAllUsersThunk, IdType, removeUser, selectAppState} from "./features/userSlice";
import React, {useEffect, useState} from "react";
import {nanoid} from "nanoid";
import {store, useAppDispatch} from "./app/store";

function App() {
    //redux
    const userState = useSelector(selectAppState())
    console.log(userState)
    //redux
    const dispatch = useAppDispatch()


    //react
    const [userInput, setUserInput] = useState("")
    const [userEmail, setUserEmail] = useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (userInput && userEmail) {
            const newUser = {name: userInput, email: userEmail, id: nanoid()}
            dispatch(addUser(newUser))
            setUserInput("")
            setUserEmail("")
        }
    }

    const handleClick = ( id: IdType) => {
        dispatch(removeUser(id))
    }

    return (
        <>
            {userState.map((user) => <li
                onClick={(e) => handleClick(user.id)}
                key={user.id}>
                {user.name}
            </li>)}
            <form onSubmit={(e) => handleSubmit(e)}  >
                <div>
                    <label>
                        user name:
                        <input value={userInput} onChange={(e) => setUserInput(e.target.value)}/>
                    </label>
                    <label>
                        user email:
                        <input value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
                    </label>
                </div>
                <button type="submit">submit</button>
            </form>
        </>
    )
}

export default App
