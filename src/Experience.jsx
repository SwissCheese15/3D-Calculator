import { Text, ContactShadows, PresentationControls, Float, Environment } from '@react-three/drei'
import Calculator from './Calculator'
import { useControls, button } from "leva"
import { useEffect, useState } from 'react'
import colors from "./Colors"


export default function Experience() {

    const [color, setColor] = useState(colors.iOS)

    const changeColors = (input) => {
        setColor(input)
        localStorage.setItem("myCalc", JSON.stringify(input))
    }

    const controls = useControls({
        iOS: button(() => {changeColors(colors.iOS)}),
        beach: button(() => {changeColors(colors.beach)}),
        pink: button(() => {changeColors(colors.pink)}),
        jungle: button(() => {changeColors(colors.jungle)}),
        colorful: button(() => {changeColors(colors.colorful)}),
    })

    let storedColor = JSON.parse(localStorage.getItem("myCalc"))

    let props = storedColor ? storedColor : color

    return <>

        {/* Cube Map Helper */}
        <Environment preset='city'/>

        {/* Background */}
        <color args={ [props.background] } attach="background" />

        {/* Controlls */}
        <PresentationControls
            global
            rotation={[ 0.13, 0.1, 0 ]}
            polar={[ -0.4, 0.2 ]}
            azimuth={[ -1.0, 0.75 ]}
            config={{ mass: 2, tension: 200 }}
            snap={{ mass: 4, tension: 400 }}
        >
            {/* Allow Model to slightly hover */}
            <Float rotationIntensity={ 0.5 }>
                    {/* GLTFJSX Model */}
                <Calculator position-y={ 0 } color={ props } />
            </Float>
        </PresentationControls>
    </>
}