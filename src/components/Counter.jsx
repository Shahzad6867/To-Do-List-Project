import { useState } from "react"

export const Counter = () => {
    const [count,setCount] = useState(0)
    function incrementCount(){
        setCount(count + 1)
    }
    function decrementCount(){
        setCount(count - 1)
    }
    function resetCount() {
        setCount(0)
    }
    return <div>
        <h1 style={{color : "white"}}>Count : {count}</h1>
        <button onClick={incrementCount}>Increment</button>
        <button onClick={decrementCount}>Decrement</button>
        <button onClick={resetCount}>Reset</button>
    </div>
}