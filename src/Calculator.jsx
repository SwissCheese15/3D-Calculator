import { Box, Cylinder, RoundedBox, Center, Text3D, Html } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import Symbol from "./Symbol/Symbol"
import { useControls } from "leva"
import "./style.css"

export default function Calculator(props) {

    let color = props.color

    // Creating stateful variable to display on calc display
    const [display, setDisplay] = useState(0)
    const [digPos, setDigPos] = useState(0.55)
    // Variable to store first operand of calculation
    const [memory, setMemory] = useState(0)
    // Variables to check if an operation is active
    const [add, setAdd] = useState(false)
    const [sub, setSub] = useState(false)
    const [mul, setMul] = useState(false)
    const [div, setDiv] = useState(false)
    // Variable to track if a new operand should start
    const [newNum, setNewNum] = useState(true)
    // Variable to control current color theme
    const [currentColor, setCurrentColor] = useState("iOS")

    let clear = useRef()
    let inverse = useRef()
    let percent = useRef()
    let divide = useRef()
    let seven = useRef()
    let eight = useRef()
    let nine = useRef()
    let times = useRef()
    let four = useRef()
    let five = useRef()
    let six = useRef()
    let minus = useRef()
    let one = useRef()
    let two = useRef()
    let three = useRef()
    let plus = useRef()
    let zero = useRef()
    let dot = useRef()
    let equal = useRef()

    // Changing the Position of the Display-Number depending on the lenght
    useEffect(() => {
        display.toString().length === 1 ? setDigPos(0.55) : null
        display.toString().length === 2 ? setDigPos(0.5) : null
        display.toString().length === 3 ? setDigPos(0.45) : null
        display.toString().length === 4 ? setDigPos(0.4) : null
        display.toString().length === 5 ? setDigPos(0.35) : null
        display.toString().length === 6 ? setDigPos(0.3) : null
        display.toString().length === 7 ? setDigPos(0.24) : null
        display.toString().length === 8 ? setDigPos(0.19) : null
        display.toString().length === 9 ? setDigPos(0.13) : null
        display.toString().length === 10 ? setDigPos(0.08) : null
        display.toString().length === 11 ? setDigPos(0.03) : null
        display.toString().length > 11 ? setDigPos(0.24) : null
    })

    let unit = 1
    let calcHeight = 2.5 * unit
    let calcWidth = 1.6 * unit
    let halfHeight = calcHeight * 0.5
    let halfWidth = calcWidth * 0.5
    let buttonRadius = 0.16 * unit
    let buttonDepth = 0.15 * unit
    let clickSpeed = 0.025
    // the lower the value, the more movement
    let clickDistance = 0.06
    let gap = (calcWidth - (buttonRadius * 8)) / 5
    let symbolScale = 0.13
    let screenDepth = 0.10 * unit
    let frame = 0.03 * unit

    // Colors

    let pMat = {
        pos1x: (buttonRadius + gap) - halfWidth,
        pos1y: (buttonRadius * 9 + gap * 5) - halfHeight,
        pos2x: buttonRadius * 3 + gap * 2 - halfWidth,
        pos2y: (buttonRadius * 9 + gap * 5) - halfHeight,
        pos3x: (buttonRadius + gap * 0.5),
        pos3y: (buttonRadius * 9 + gap * 5) - halfHeight,
        pos4x: buttonRadius * 3 + gap * 1.5,
        pos4y: (buttonRadius * 9 + gap * 5) - halfHeight,

        pos5x: (buttonRadius + gap) - halfWidth,
        pos5y: (buttonRadius * 7 + gap * 4) - halfHeight,
        pos6x: buttonRadius * 3 + gap * 2 - halfWidth,
        pos6y: (buttonRadius * 7 + gap * 4) - halfHeight,
        pos7x: (buttonRadius + gap * 0.5),
        pos7y: (buttonRadius * 7 + gap * 4) - halfHeight,
        pos8x: buttonRadius * 3 + gap * 1.5,
        pos8y: (buttonRadius * 7 + gap * 4) - halfHeight,

        pos9x: (buttonRadius + gap) - halfWidth,
        pos9y: (buttonRadius * 5 + gap * 3) - halfHeight,
        pos10x: buttonRadius * 3 + gap * 2 - halfWidth,
        pos10y: (buttonRadius * 5 + gap * 3) - halfHeight,
        pos11x: (buttonRadius + gap * 0.5),
        pos11y: (buttonRadius * 5 + gap * 3) - halfHeight,
        pos12x: buttonRadius * 3 + gap * 1.5,
        pos12y: (buttonRadius * 5 + gap * 3) - halfHeight,

        pos13x: (buttonRadius + gap) - halfWidth,
        pos13y: (buttonRadius * 3 + gap * 2) - halfHeight,
        pos14x: buttonRadius * 3 + gap * 2 - halfWidth,
        pos14y: (buttonRadius * 3 + gap * 2) - halfHeight,
        pos15x: (buttonRadius + gap * 0.5),
        pos15y: (buttonRadius * 3 + gap * 2) - halfHeight,
        pos16x: buttonRadius * 3 + gap * 1.5,
        pos16y: (buttonRadius * 3 + gap * 2) - halfHeight,

        // 17 Special beacuse 0 button is bigger
        pos17x: (buttonRadius * 2 + gap * 1.5) - halfWidth,
        pos17y: (buttonRadius + gap) - halfHeight,
        pos18x: (buttonRadius + gap * 0.5),
        pos18y: (buttonRadius + gap) - halfHeight,
        pos19x: buttonRadius * 3 + gap * 1.5,
        pos19y: (buttonRadius + gap) - halfHeight,
    }

    // let moveIn = false
    // let moveOut = false
    const [moveIn, setMoveIn] = useState(false)
    const [moveOut, setMoveOut] = useState(false)
    const [objToMove, setObjToMove] = useState(undefined)

    
    useFrame(() => {
        
        if (moveIn) {
            objToMove.current.position.z -= clickSpeed
            objToMove.current.position.z <= clickDistance ? setMoveIn(false) : null
        }
        else if (moveOut) {
            objToMove.current.position.z += clickSpeed
            objToMove.current.position.z >= buttonDepth - 0.01  ? setMoveOut(false) : null
        }
    })

    // Function to handle all buttons
    const handleClick = (ref, value) => {

        // Moving the pressed button logic
        setObjToMove(ref)
        setMoveIn(true)
        setMoveOut(true)

        if (typeof(value) === "number" || value === ".") {
            // Limit length of display to prevent to many digits
            if (display.toString().length <= 10) {
                 // Anything but the first input
                if (display !== 0 && !newNum) {
                    // Handle "dot" input
                    if (value === ".") {
                        // Turning the display into a String and back to append new Digits
                        let currentDisplay = display
                        let currentString = currentDisplay.toString()
                        // Checking if there already is a decimal point
                        if (!currentString.includes(".")) {
                            let newString = currentString + value
                            setDisplay(newString)
                        }
                    }
                    // Handle number inputs
                    else {
                        let currentDisplay = display
                        let currentString = currentDisplay.toString()
                        let newString = currentString + value.toString()
                        setDisplay(newString)
                    }
                }
                // Handling the first input
                else if (value !== ".") {
                    setNewNum(false)
                    setDisplay(value)
                }
                else {
                    setNewNum(false)
                    setDisplay("0.")
                }
            }
        }
        // Handle C Button
        else if (value === "clear") {
            setDisplay(0); setMemory(0), setAdd(false), setNewNum(true)
        }

        // Handle +/- Button
        else if (value === "inverse") {
            setDisplay(display * -1)
        }

        // Handle % Button
        else if (value === "percent") {
            setDisplay(display * 0.01)
        }

        // Handle Plus Button
        else if (value === "plus") {
            // Quick Operation by pressing operator again
            if (add) {
                setMemory(Number(memory) + Number(display))
                setDisplay(Number(memory) + Number(display))
            }
            else {setMemory(Number(display))}
            setAdd(true)
            setNewNum(true)
        }

        // Handle Minus Button
        else if (value === "minus") {
            // Quick Operation by pressing operator again
            if (sub) {
                setMemory(Number(memory) - Number(display))
                setDisplay(Number(memory) - Number(display))
            }
            else {setMemory(Number(display))}
            setSub(true)
            setNewNum(true)
        }

        // Handle Times Button
        else if (value === "times") {
            // Quick Operation by pressing operator again
            if (mul) {
                setMemory(Number(display) * Number(memory))
                setDisplay(Number(display) * Number(memory))
            }
            else {setMemory(Number(display))}
            setMul(true)
            setNewNum(true)
        }

        // Handle Divide Button
        else if (value === "divide") {
            // Quick Operation by pressing operator again
            if (div) {
                setMemory(Number(memory) / Number(display))
                setDisplay(Number(memory) / Number(display))
            }
            else {setMemory(Number(display))}
            setDiv(true)
            setNewNum(true)
        }

        // Handle Equal Button
        else if (value === "equal") {
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
    }

    return (
    <>
        <RoundedBox
        args={[ calcWidth, calcHeight, 0.2 ]} 
        radius={ 0.05 }
        smoothness={ 8 }
        creaseAngle={ 0.4 }
        >
            <meshStandardMaterial color={color.calcColor} wireframe={false}/>
        </RoundedBox>

        {/* Screen */}
        <group position={[ 0, (buttonRadius * 11 + gap * 7) - halfHeight, screenDepth ]}>
            <Box
            args={[ calcWidth - gap * 2, calcHeight - (buttonRadius * 10 + gap * 7), screenDepth ]}
            >
                <meshStandardMaterial color={"black"} wireframe={false}/>
            </Box>

            <Box
            args={[ (calcWidth - gap * 2) - frame, (calcHeight - (buttonRadius * 10 + gap * 7)) - frame, screenDepth ]}
            position-z={0.001}
            >
                <meshStandardMaterial color={"white"} wireframe={false}/>
            </Box>

            {/* Digits on Display */}
            <Center position-z={0.05} position-x={digPos}>       
                <Text3D
                font="/fonts/helvetiker_regular.typeface.json"
                scale={[0.15, 0.15, 0.05]}
                >
                    {/* Rounding to limit digits after decimal */}
                    {Math.round((Number(display) * 100000)) / 100000}
                    <meshStandardMaterial color="black"/>
                </Text3D>
            </Center>

            {/* Screen Light */}
            <rectAreaLight
            width={ ((calcWidth - gap * 2) - frame) - 0.3}
            height={ ((calcHeight - (buttonRadius * 10 + gap * 7)) - frame) - 0.2}
            intensity={ 3 }
            color={ "white" }
            position-z={0.3}
            />
        </group>

        <Cylinder
        ref={clear}
        onClick={() => handleClick(clear, "clear")}
        args={[ buttonRadius, buttonRadius, buttonDepth ]}
        rotation-x={ Math.PI * 0.5 }
        position={[ pMat.pos1x, pMat.pos1y, buttonDepth - 0.01 ]}
        >
            <meshStandardMaterial color={color.speColor} wireframe={false}/>
            <Symbol char={"C"} scale={symbolScale}/>
        </Cylinder>

        <Cylinder
        ref={inverse}
        onClick={() => handleClick(inverse, "inverse")}
        args={[ buttonRadius, buttonRadius, buttonDepth ]}
        rotation-x={ Math.PI * 0.5 }
        position={[ pMat.pos2x, pMat.pos2y, buttonDepth - 0.01 ]}
        >
            <meshStandardMaterial color={color.speColor} wireframe={false}/>
            <Symbol char={"+/-"} scale={symbolScale * 0.8}/>
        </Cylinder>

        <Cylinder
        ref={percent}
        onClick={() => handleClick(percent, "percent")}
        args={[ buttonRadius, buttonRadius, buttonDepth ]}
        rotation-x={ Math.PI * 0.5 }
        position={[ pMat.pos3x, pMat.pos3y, buttonDepth - 0.01 ]}
        >
            <meshStandardMaterial color={color.speColor} wireframe={false}/>
            <Symbol char={"%"} scale={symbolScale}/>
        </Cylinder>

        <Cylinder
        ref={divide}
        onClick={() => handleClick(divide, "divide")}
        args={[ buttonRadius, buttonRadius, buttonDepth ]}
        rotation-x={ Math.PI * 0.5 }
        position={[ pMat.pos4x, pMat.pos4y, buttonDepth - 0.01 ]}
        >
            <meshStandardMaterial color={color.opColor} wireframe={false}/>
            <Symbol char={"/"} scale={symbolScale}/>
        </Cylinder>

        <Cylinder
        ref={seven}
        onClick={() => handleClick(seven, 7)}
        args={[ buttonRadius, buttonRadius, buttonDepth ]}
        rotation-x={ Math.PI * 0.5 }
        position={[ pMat.pos5x, pMat.pos5y, buttonDepth - 0.01 ]}
        >
            <meshStandardMaterial color={color.numColor} wireframe={false}/>
            <Symbol char={7} scale={symbolScale}/>
        </Cylinder>

        <Cylinder
        ref={eight}
        onClick={() => handleClick(eight, 8)}
        args={[ buttonRadius, buttonRadius, buttonDepth ]}
        rotation-x={ Math.PI * 0.5 }
        position={[ pMat.pos6x, pMat.pos6y, buttonDepth - 0.01 ]}
        >
            <meshStandardMaterial color={color.numColor} wireframe={false}/>
            <Symbol char={8} scale={symbolScale}/>
        </Cylinder>

        <Cylinder
        ref={nine}
        onClick={() => handleClick(nine, 9)}
        args={[ buttonRadius, buttonRadius, buttonDepth ]}
        rotation-x={ Math.PI * 0.5 }
        position={[ pMat.pos7x, pMat.pos7y, buttonDepth - 0.01 ]}
        >
            <meshStandardMaterial color={color.numColor} wireframe={false}/>
            <Symbol char={9} scale={symbolScale}/>
        </Cylinder>

        <Cylinder
        ref={times}
        onClick={() => handleClick(times, "times")}
        args={[ buttonRadius, buttonRadius, buttonDepth ]}
        rotation-x={ Math.PI * 0.5 }
        position={[ pMat.pos8x, pMat.pos8y, buttonDepth - 0.01 ]}
        >
            <meshStandardMaterial color={color.opColor} wireframe={false}/>
            <Symbol char={"x"} scale={symbolScale}/>
        </Cylinder>

        <Cylinder
        ref={four}
        onClick={() => handleClick(four, 4)}
        args={[ buttonRadius, buttonRadius, buttonDepth ]}
        rotation-x={ Math.PI * 0.5 }
        position={[ pMat.pos9x, pMat.pos9y, buttonDepth - 0.01 ]}
        >
            <meshStandardMaterial color={color.numColor} wireframe={false}/>
            <Symbol char={4} scale={symbolScale}/>
        </Cylinder>

        <Cylinder
        ref={five}
        onClick={() => handleClick(five, 5)}
        args={[ buttonRadius, buttonRadius, buttonDepth ]}
        rotation-x={ Math.PI * 0.5 }
        position={[ pMat.pos10x, pMat.pos10y, buttonDepth - 0.01 ]}
        >
            <meshStandardMaterial color={color.numColor} wireframe={false}/>
            <Symbol char={5} scale={symbolScale}/>
        </Cylinder>

        <Cylinder
        ref={six}
        onClick={() => handleClick(six, 6)}
        args={[ buttonRadius, buttonRadius, buttonDepth ]}
        rotation-x={ Math.PI * 0.5 }
        position={[ pMat.pos11x, pMat.pos11y, buttonDepth - 0.01 ]}
        >
            <meshStandardMaterial color={color.numColor} wireframe={false}/>
            <Symbol char={6} scale={symbolScale}/>
        </Cylinder>

        <Cylinder
        ref={minus}
        onClick={() => handleClick(minus, "minus")}
        args={[ buttonRadius, buttonRadius, buttonDepth ]}
        rotation-x={ Math.PI * 0.5 }
        position={[ pMat.pos12x, pMat.pos12y, buttonDepth - 0.01 ]}
        >
            <meshStandardMaterial color={color.opColor} wireframe={false}/>
            <Symbol char={"_"} scale={symbolScale}/>
        </Cylinder>

        <Cylinder
        ref={one}
        onClick={() => handleClick(one, 1)}
        args={[ buttonRadius, buttonRadius, buttonDepth ]}
        rotation-x={ Math.PI * 0.5 }
        position={[ pMat.pos13x, pMat.pos13y, buttonDepth - 0.01 ]}
        >
            <meshStandardMaterial color={color.numColor} wireframe={false}/>
            <Symbol char={1} scale={symbolScale}/>
        </Cylinder>

        <Cylinder
        ref={two}
        onClick={() => handleClick(two, 2)}
        args={[ buttonRadius, buttonRadius, buttonDepth ]}
        rotation-x={ Math.PI * 0.5 }
        position={[ pMat.pos14x, pMat.pos14y, buttonDepth - 0.01 ]}
        >
            <meshStandardMaterial color={color.numColor} wireframe={false}/>
            <Symbol char={2} scale={symbolScale}/>
        </Cylinder>

        <Cylinder
        ref={three}
        onClick={() => handleClick(three, 3)}
        args={[ buttonRadius, buttonRadius, buttonDepth ]}
        rotation-x={ Math.PI * 0.5 }
        position={[ pMat.pos15x, pMat.pos15y, buttonDepth - 0.01 ]}
        >
            <meshStandardMaterial color={color.numColor} wireframe={false}/>
            <Symbol char={3} scale={symbolScale}/>
        </Cylinder>

        <Cylinder
        ref={plus}
        onClick={() => handleClick(plus, "plus")}
        args={[ buttonRadius, buttonRadius, buttonDepth ]}
        rotation-x={ Math.PI * 0.5 }
        position={[ pMat.pos16x, pMat.pos16y, buttonDepth - 0.01 ]}
        >
            <meshStandardMaterial color={color.opColor} wireframe={false}/>
            <Symbol char={"+"} scale={symbolScale}/>
        </Cylinder>

        <group
        ref={zero}
        onClick={() => handleClick(zero, 0)}
        position={[ pMat.pos17x, pMat.pos17y, buttonDepth - 0.01 ]}
        >
            <Cylinder
            args={[ buttonRadius, buttonRadius, buttonDepth ]}
            rotation-x={ Math.PI * 0.5 }
            position={[ buttonRadius + gap * 0.5, 0, 0 ]}
            >
                <meshStandardMaterial color={color.numColor} wireframe={false}/>
            </Cylinder>

            <Box
            args={[ buttonRadius * 2 + gap, buttonRadius * 2, buttonDepth ]}
            position={[ 0, 0, 0 ]}
            >
                <meshStandardMaterial color={color.numColor} wireframe={false}/>
            </Box>

            <Cylinder
            args={[ buttonRadius, buttonRadius, buttonDepth ]}
            rotation-x={ Math.PI * 0.5 }
            position={[ -(buttonRadius + gap * 0.5), 0, 0 ]}
            >
                <meshStandardMaterial color={color.numColor} wireframe={false}/>
            </Cylinder>

            <Center position-z={0.09}>       
                <Text3D
                font="/fonts/helvetiker_regular.typeface.json"
                scale={symbolScale}
                >
                    0
                    <meshStandardMaterial color="white"/>
                </Text3D>
            </Center>
        </group>
        
        <Cylinder
        ref={dot}
        onClick={() => handleClick(dot, ".")}
        args={[ buttonRadius, buttonRadius, buttonDepth ]}
        rotation-x={ Math.PI * 0.5 }
        position={[ pMat.pos18x, pMat.pos18y, buttonDepth - 0.01 ]}
        >
            <meshStandardMaterial color={color.numColor} wireframe={false}/>
            <Symbol char={"."} scale={symbolScale}/>
        </Cylinder>

        <Cylinder
        ref={equal}
        onClick={() => handleClick(equal, "equal")}
        args={[ buttonRadius, buttonRadius, buttonDepth ]}
        rotation-x={ Math.PI * 0.5 }
        position={[ pMat.pos19x, pMat.pos19y, buttonDepth - 0.01 ]}
        >
            <meshStandardMaterial color={color.opColor} wireframe={false}/>
            <Symbol char={"="} scale={symbolScale}/>
        </Cylinder>
    </>
    )
}
