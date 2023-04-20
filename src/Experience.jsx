import { Text, ContactShadows, PresentationControls, Float, Environment } from '@react-three/drei'
import Calculator from './Calculator'
import { useControls, button } from "leva"
import { useState } from 'react'
import colors from "./Colors"


export default function Experience() {

    const [color, setColor] = useState(colors.iOS)

    const controls = useControls({
        iOS: button(() => {setColor(colors.iOS)}),
        beach: button(() => {setColor(colors.beach)}),
        pink: button(() => {setColor(colors.pink)}),
        jungle: button(() => {setColor(colors.jungle)}),
        colorful: button(() => {setColor(colors.colorful)})
    })

    return <>

        {/* Cube Map Helper */}
        <Environment preset='city'/>

        {/* Background */}
        <color args={ [ color.background ] } attach="background" />

        {/* Controlls */}
        <PresentationControls
            global
            rotation={[ 0.13, 0.1, 0 ]}
            polar={[ -0.4, 0.2 ]}
            // azimuth={[ -1.0, 0.75 ]}
            config={{ mass: 2, tension: 200 }}
            snap={{ mass: 4, tension: 400 }}
        >
            {/* Allow Model to slightly hover */}
            <Float rotationIntensity={ 0.5 }>
                    {/* GLTFJSX Model */}
                <Calculator position-y={ 0 } color={color}/>
            </Float>
        </PresentationControls>
    </>
}