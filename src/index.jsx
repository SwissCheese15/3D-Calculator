import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(

    <Canvas className='canvas'
        shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 2000,
            position: [ -1.5, 0.5, 4 ]
        } }
    >
        <Experience />
    </Canvas>
)