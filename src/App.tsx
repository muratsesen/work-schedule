// Lets modify this code to keep track of my working schedule. Add an input button receive the process name eg 'working' or 'break', 'lunch break'.
// When enter clicked it should put the precess to a list showing its name and start time. The process will continue untill user add another process.
// When user enters another process it will automatically and the previous process and modify the list and show the previous process like 'start time -  end-time - duration in minutes -  process name'

import React, { useState } from "react";
import "./App.css";
import * as styles from "./styles";

function App() {
  const [processes, setProcesses] = useState([]);
  const [currentProcess, setCurrentProcess] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);

  const handleInputChange = (event) => {
    setCurrentProcess(event.target.value);
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter" && currentProcess.trim() !== "") {
      saveProcess();
      setCurrentProcess("");
    }
  };

  const saveProcess =  (item) =>{
    if (startTime) {
      const newProcesses = [...processes];
      const lastIndex = newProcesses.length - 1;
      if (lastIndex >= 0) {
        // Update end time and calculate duration for the last process
        const endTime = new Date();
        const duration = Math.round((endTime - startTime) / 1000 / 60); // Duration in minutes
        newProcesses[lastIndex] = {
          ...newProcesses[lastIndex],
          endTime: endTime.toLocaleTimeString("tr-TR", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          }),
          duration: duration,
        };
      }

      // Add new process to the end of the array
      newProcesses.push({
        name: item,
        startTime: startTime.toLocaleTimeString("tr-TR", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
        endTime: null, // End time will be updated when the next process starts
        duration: null, // Duration will be calculated when the next process ends
      });

      // Update state with the new processes array
      setProcesses(newProcesses);
      setStartTime(new Date());
    } else {
      let startTime = new Date();
      setStartTime(startTime);
      setProcesses([
        ...processes,
        {
          name: item,
          startTime: startTime.toLocaleTimeString("tr-TR", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          }),
          endTime: null,
          duration: 0,
        },
      ]);
    }
  }
  const handleTemplateClick = async (item: string)=>{
    setCurrentProcess(item);
    saveProcess(item);
  }
  console.log("%csrc/App.tsx:49 processes", "color: #007acc;", processes);
  return (
    <div className="App">
      <h1>Working Schedule Tracker</h1>
      <div style={{...styles.inputWrapper}}>
        <input
        style={{...styles.input}}
          type="text"
          placeholder="Enter process name (e.g., working, break, lunch break)"
          value={currentProcess}
          onChange={handleInputChange}
          onKeyDown={handleEnterPress}
        />
        <div style={{ ...styles.templateContainer }}>
          {styles.templates.map(item => <button onClick={()=>handleTemplateClick(item)}>{item}</button>)}
        </div>
      </div>
      <div className="process-list">
        {processes.map((process, index) => (
          <div key={index} className="process-item">
            <p>
              {process.startTime}{" "}
              {process.endTime
                ? ` - ${process.endTime} - ${process.duration} min - `
                : null}
              {process.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
