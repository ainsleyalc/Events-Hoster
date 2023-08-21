import React from "react";

const Home = () =>{
   
    return (
        <div>
            <h1>Home Page</h1>
       
                <div>
                    <input
                        type="text"
                        placeholder="username"
                        value={null}
                        // onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={null}>Hit me to fetch</button>
                </div>
            
        </div>
    );
};
export default Home