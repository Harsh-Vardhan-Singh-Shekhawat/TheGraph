import { useState, useEffect } from 'react'
import './App.css';
import {createClient} from 'urql';

function App() {
  const [tokens, setTokens] = useState([]);
  //API_KEY = f85ea0f18549fb331713e8714c4d72ad
  const queryURL = 'https://gateway.thegraph.com/api/f85ea0f18549fb331713e8714c4d72ad/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7';
  const query = `{
    tokens(first: 5) {
      id
      name
      symbol
      decimals
    }
  }
  `;

    const client = createClient({
      url:queryURL
    })

    useEffect(()=> {
      const getTokens = async () => {
        const {data} = await client.query(query).toPromise();
        // console.log(data);
        setTokens(data.tokens);
      }
      getTokens();
    },[])
  return (
    <>
      <div>
        Hi, This website's using the graph protocol !
      </div>
      <div>
        <h1>This is the uniswap subgraph data!</h1>
        {tokens !== null && tokens.length > 0 && tokens.map((token) => {
          return(
            <div className='token'>
            {token.name}<br />
            {token.id}<br />
            {token.symbol}
          </div>
          )
        })}
      </div>
    </>
  )
}

export default App
