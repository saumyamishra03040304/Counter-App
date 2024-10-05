import { useState,useEffect,useRef } from "react"
import "./CountdownTimer.css"
function CountdownTimerApp()
{ 
    const [Time,setTime] = useState(0);
    const [isActive,setActive] = useState(false);
    const [isPause,setIsPause] = useState(false);
    const IntervalRef = useRef(null);
    function handleInput(event)
    {
      setTime(parseInt(event.target.value * 60));
    }
    
    function formatTime()
    {
      const min = String(Math.floor(Time/60)).padStart(2,'0');
      const sec = String(Time%60).padStart(2,'0');
      return `${min} : ${sec}`
    }

    function handleStart()
    {
       setActive(true);
       setIsPause(false);
    }

    useEffect(()=>{
      if(isActive && !isPause && Time>0)
      {
        IntervalRef.current = setInterval(()=>{
          setTime((prev)=>prev-1)
        },1000)
      }
      else if(Time === 0)
      {
        clearInterval(IntervalRef.current)
        setActive(false);
        alert("Time is up")
      }
      return ()=> clearInterval(IntervalRef.current)
    },[isActive,isPause,Time])

    function handlePause()
    {
      setIsPause(!isPause);
    }

    function handleReset()
    {
      clearInterval(IntervalRef.current);
      setActive(false);
      setIsPause(false);
      setTime(0);
    }
    return(
        <>
          <div className="countdown-timer">
              <h1>Countdown Timer</h1>
              <div className="timer-display">
                <input type="Number" placeholder="Enter time in minutes" onChange={handleInput}/>
                <div>{formatTime()}</div>
              </div>
              <div className="timer-controls">
                    <button onClick={handleStart} disabled={isActive && !isPause}>Start</button>
                    <button onClick={handlePause} disabled={!isActive}>{isPause ? 'Resume':'Pause'}</button>
                    <button onClick={handleReset}>Reset</button>
              </div>
          </div>
        </>
    )
}
export default CountdownTimerApp;