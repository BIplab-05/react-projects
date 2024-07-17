import React, { useState, useEffect, useRef } from "react";

export default function StopWatch() {
	const [isrunning, setIsRunning] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0);
	const intervalIdRef = useRef(null);
	const startTimeRef = useRef(0);
	useEffect(() => {
		if (isrunning) {
			intervalIdRef.current = setInterval(() => {
				setElapsedTime(Date.now() - startTimeRef.current);
			}, 10);
		}
		return () => {
			clearInterval(intervalIdRef.current);
		};
	}, [isrunning]);

	function ToggleStopstart() {
		setIsRunning(!isrunning);
        startTimeRef.current = Date.now() - elapsedTime;
        
	}

	// function stop() {
	// 	setIsRunning(false);
	// }

	function reset() {
		setElapsedTime(0);
		setIsRunning(false);
	}

	function formateTime() {
		let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
		let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
		let seconds = Math.floor((elapsedTime / 1000) % 60);
        let miliSeconds = Math.floor((elapsedTime % 1000) / 10);
        
        hours = String(hours).padStart(2, "0")
        minutes = String(minutes).padStart(2, "0")
        seconds = String(seconds).padStart(2, "0")
        miliSeconds = String(miliSeconds).padStart(2, "0")


		return `${minutes}:${seconds}:${miliSeconds}`;
	}

	return (
		<div className="container">
			<div className="stopWatch">
				<div className="display">{formateTime()}</div>
				<div className="controls">
					<button onClick={ToggleStopstart} className="start-button">
						{isrunning ? "Stop" : "Start"}
					</button>
					<button onClick={reset} className="reset-button">
						Reset
					</button>
					{/* <button onClick={stop} className="stop-button">
					Stop
				</button> */}
				</div>
			</div>
		</div>
	);
}
