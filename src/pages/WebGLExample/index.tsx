import React, { useState, useEffect, useRef, useCallback } from 'react';
import WebGL from '../../components/WebGL';
import Cube from '../../components/WebGL/Cube';
import GeometricObject from '../../components/WebGL/GeometricObject';

import Triangle from "../../components/WebGL/Triangle"


//https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext
//https://github.com/cx20/webgl-physics-examples
//https://webgl2fundamentals.org/


//Animations
//https://css-tricks.com/using-requestanimationframe-with-react-hooks/

const WebGLExample: React.FC = (props: any) => {

    const geometric = useRef<GeometricObject>(new Triangle());
    const target = useRef<{x: number, y: number}>({x: 0, y: 0});
    const current = useRef<{x: number, y: number}>({x: 0.5, y: 0.8});
    const timestamp = useRef<number>(0);
    const animationRef = useRef<number>(0);
    
    const randCoord = () => {
        return 2 * Math.random() - 1;
    };

    const randCol = () => {
        return Math.floor(255 * Math.random());
    };
    
    // const positions = useRef<Array<number>>([
    const [ positions, setPositions ] = useState<Float32Array>(new Float32Array([
        randCoord(), randCoord(), 0, 1,
        randCoord(), randCoord(), 0, 1,
        randCoord(), randCoord(), 0, 1,
        randCoord(), randCoord(), 0, 1,
        randCoord(), randCoord(), 0, 1,
        randCoord(), randCoord(), 0, 1,
    ]));

    const [ colors, setColors ] = useState<Uint8Array>(new Uint8Array([
        randCol(), randCol(), randCol(), 1,
        randCol(), randCol(), randCol(), 1,
        randCol(), randCol(), randCol(), 1,
        randCol(), randCol(), randCol(), 1,
        randCol(), randCol(), randCol(), 1,
        randCol(), randCol(), randCol(), 1
    ]));
    
    const clickGl = useCallback(() => {
        let x = randCoord();
        let y = randCoord();
        target.current = {x, y};
        
        geometric.current.generateVertices();
        setPositions(geometric.current.getVertices())
        geometric.current.generateColors();
        setColors(geometric.current.getColors())
    }, []);

    

    useEffect(() => {
        clickGl();

        const drawFrame = (time: number) => {
            if(timestamp.current === 0) { 
                console.log("ZERO");
                timestamp.current = time; 
                requestAnimationFrame(drawFrame); 
                return; 
            }
            
            const newTime = time - timestamp.current;
            timestamp.current = time;
            let x = current.current.x;
            let y = current.current.y;
    
            let dx = x - target.current.x;
            let dy = y - target.current.y;
    
            if(Math.abs(dx) < 0.001) { current.current = { x: target.current.x, y: current.current.y } }
            else { x -= 0.0004 + (dx) * 0.8 * newTime * 0.001; }
    
            if(Math.abs(dy) < 0.001) { current.current = { x: current.current.x, y: target.current.y } }
            else { y -= 0.0004 + (dy) * 0.8 * newTime * 0.001; }
    
            current.current = {x, y}
    
            setPositions(prevPos => geometric.current.getVertices());
            animationRef.current = requestAnimationFrame(drawFrame);
        }
        

        animationRef.current = requestAnimationFrame(drawFrame);
        return () => cancelAnimationFrame(animationRef.current);
    }, [clickGl]);

    useEffect(() => {
        const x = current.current.x;
        const y = current.current.y;
        setPositions(new Float32Array([
            0, 0, 0, 1, 
            -1, -1, 0, 1,
            x, y, 0, 1,
            0, 0, 0, 1,
            -1, 1, 0, 1,
            x, y, 0, 1,
        ]));
    }, [current.current.x, current.current.y])

    return (
        <div style={{position: "relative", height: "inherit"}}>
            <form style={{"zIndex": 1000, position: "absolute", top: 0, left: 0}}><select>
                <option onClick={() => {geometric.current = new Triangle()}}>Triangles</option>
                <option onClick={() => {geometric.current = new Cube()}}>Cube</option>
            </select></form>
            <WebGL
                positions={positions}
                colors={colors}
                clickGl={clickGl}
                triangleCount={6}
            />
        </div>
    )

}

export default WebGLExample;