import "./styles.css"
import { useState } from "react"

export default function Calculator() {

    // Creating stateful variable to display on calc display
    const [display, setDisplay] = useState(0)
    // Variable to store first operand of calculation
    const [memory, setMemory] = useState(0)
    // Variables to check if an operation is active
    const [add, setAdd] = useState(false)
    const [sub, setSub] = useState(false)
    const [mul, setMul] = useState(false)
    const [div, setDiv] = useState(false)
    // Variable to track if a new operand should start
    const [newNum, setNewNum] = useState(true)

    // Handle C Button
    const clear = () => { setDisplay(0); setMemory(0), setAdd(false), setNewNum(true)}

    // Handle +/- Button
    const timesNegOne = () => setDisplay(display * -1)
        
    // Handle % Button
    const percent = () => setDisplay(display * 0.01)

    // Function to add a number to the display
    const pressNum = (num) => {

        // Anything but the first input
        if (display !== 0 && !newNum) {
            // Handle "dot" input
            if (num === ".") {
                // Turning the display into a String and back to append new Digits
                let currentDisplay = display
                let currentString = currentDisplay.toString()
                // Checking if there already is a decimal point
                if (!currentString.includes(".")) {
                    let newString = currentString + num
                    setDisplay(newString)
                }
            }
            // Handle number inputs
            else {
                let currentDisplay = display
                let currentString = currentDisplay.toString()
                let newString = currentString + num.toString()
                setDisplay(newString)
            }
        }
        // Handling the first input
        else if (num !== ".") {
            setNewNum(false)
            setDisplay(num)
        }
        else {
            setNewNum(false)
            setDisplay("0.")
        }
    }

    const handlePlus = () => {
        // Quick Operation by pressing operator again
        if (add) {
            setMemory(Number(memory) + Number(display))
            setDisplay(Number(memory) + Number(display))
        }
        else {setMemory(Number(display))}
        setAdd(true)
        setNewNum(true)
    }

    const handleMinus = () => {
        // Quick Operation by pressing operator again
        if (sub) {
            setMemory(Number(memory) - Number(display))
            setDisplay(Number(memory) - Number(display))
        }
        else {setMemory(Number(display))}
        setSub(true)
        setNewNum(true)
    }

    const handleTimes = () => {
        // Quick Operation by pressing operator again
        if (mul) {
            setMemory(Number(display) * Number(memory))
            setDisplay(Number(display) * Number(memory))
        }
        else {setMemory(Number(display))}
        setMul(true)
        setNewNum(true)
    }

    const handleSlash = () => {
        // Quick Operation by pressing operator again
        if (div) {
            setMemory(Number(memory) / Number(display))
            setDisplay(Number(memory) / Number(display))
        }
        else {setMemory(Number(display))}
        setDiv(true)
        setNewNum(true)
    }
    
    const handleEqual = () => {
        add ? setDisplay(Number(memory) + Number(display)) : ""
        sub ? setDisplay(Number(memory) - Number(display)) : ""
        mul ? setDisplay(Number(memory) * Number(display)) : ""
        div ? setDisplay(Number(memory) / Number(display)) : ""
        
        // Resetting
        setMemory(0)
        setAdd(false)
        setSub(false)
        setMul(false)
        setDiv(false)
    }

    return (
        <>
        <div className="calculator-div">
            <div className="frame-div">
                <div className="display-div">
                    <p className="display-p">{Math.round((Number(display) * 10000)) / 10000}</p>
                </div>
                <div className="button-div">
                    <button className="special-button-1" onClick={clear}>C</button>
                    <button className="special-button-2" onClick={timesNegOne}>+/-</button>
                    <button className="special-button-3" onClick={percent}>%</button>
                    <button className="number-button-7" onClick={() => {pressNum(7)}}>7</button>
                    <button className="number-button-8" onClick={() => {pressNum(8)}}>8</button>
                    <button className="number-button-9" onClick={() => {pressNum(9)}}>9</button>
                    <button className="number-button-4" onClick={() => {pressNum(4)}}>4</button>
                    <button className="number-button-5" onClick={() => {pressNum(5)}}>5</button>
                    <button className="number-button-6" onClick={() => {pressNum(6)}}>6</button>
                    <button className="number-button-1" onClick={() => {pressNum(1)}}>1</button>
                    <button className="number-button-2" onClick={() => {pressNum(2)}}>2</button>
                    <button className="number-button-3" onClick={() => {pressNum(3)}}>3</button>
                    <button className="number-button-0" onClick={() => {pressNum(0)}}>0</button>
                    <button className="number-button-dot" onClick={() => {pressNum(".")}}>.</button>
                    <button className="operator-button" onClick={handleSlash}>/</button>
                    <button className="operator-button" onClick={handleTimes}>x</button>
                    <button className="operator-button" onClick={handleMinus}>-</button>
                    <button className="operator-button" onClick={handlePlus}>+</button>
                    <button className="operator-button" onClick={handleEqual}>=</button>
                </div>
            </div>
        </div>
    </>
    )
}