import { Text3D, Center } from "@react-three/drei"

export default function Symbol(props) {

    return(
    <>
        <Center position-y={0.09}>       
            <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            rotation-x={ Math.PI * 1.5 }
            scale={props.scale}
            >
                {props.char}
                <meshStandardMaterial color="white"/>
            </Text3D>
        </Center>
    </>
    )

}