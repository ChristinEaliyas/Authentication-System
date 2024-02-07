import React from 'react'
import axios from "../api/axios";

const VERIFY_URL = "/jwt-test"
const handleClick = async (e) => {
    try {
        const response = await axios.post(
            VERIFY_URL,   
        )
    } catch (err) {
        console.log(err)
    }
}

const Home = () => {
  return (
    <section>
        <div>
            <h1>Home Page</h1>
            <button onSubmit={handleClick}>Verify JWT</button>
        </div>
    </section>
  )
}

export default Home