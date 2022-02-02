import React, { useState, useEffect, useRef } from 'react';
import WebGL from '../../components/WebGL';


//https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext
//https://github.com/cx20/webgl-physics-examples
//https://webgl2fundamentals.org/


//Animations
//https://css-tricks.com/using-requestanimationframe-with-react-hooks/

const WebGLExample: React.FC = (props: any) => {

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
    const [ positions, setPositions ] = useState([
        randCoord(), randCoord(), 0, 1,
        randCoord(), randCoord(), 0, 1,
        randCoord(), randCoord(), 0, 1,
        randCoord(), randCoord(), 0, 1,
        randCoord(), randCoord(), 0, 1,
        randCoord(), randCoord(), 0, 1,
    ]);

    const [ colors, setColors ] = useState([
        randCol(), randCol(), randCol(), 1,
        randCol(), randCol(), randCol(), 1,
        randCol(), randCol(), randCol(), 1,
        randCol(), randCol(), randCol(), 1,
        randCol(), randCol(), randCol(), 1,
        randCol(), randCol(), randCol(), 1
    ]);
    
    const clickGl = () => {
        let x = randCoord();
        let y = randCoord();
        target.current = {x, y};
        
        // positions.current = [
        //     0, 0, 0, 1, 
        //     -1, -1, 0, 1,
        //     x, y, 0, 1,
        //     0, 0, 0, 1,
        //     -1, 1, 0, 1,
        //     x, y, 0, 1,
        // ];

        setColors([
            randCol(), 0, randCol(), 1,
            randCol(), 0, randCol(), 1,
            randCol(), 0, randCol(), 1,
            0, 200, randCol(), 1,
            0, 100, randCol(), 1,
            0, 1, randCol(), 1,
        ]);
    }

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

        setPositions(prevPos => [
            0, 0, 0, 1, 
            -1, -1, 0, 1,
            x, y, 0, 1,
            0, 0, 0, 1,
            -1, 1, 0, 1,
            x, y, 0, 1,
        ]);
        animationRef.current = requestAnimationFrame(drawFrame);
    }

    useEffect(() => {
        clickGl();

        animationRef.current = requestAnimationFrame(drawFrame);
        return () => cancelAnimationFrame(animationRef.current);
    }, []);

    useEffect(() => {
        const x = current.current.x;
        const y = current.current.y;
        setPositions([
            0, 0, 0, 1, 
            -1, -1, 0, 1,
            x, y, 0, 1,
            0, 0, 0, 1,
            -1, 1, 0, 1,
            x, y, 0, 1,
        ]);
    }, [current.current.x, current.current.y])

    return (
        //https://www.newline.co/@andreeamaco/react-dropdown-tutorial-for-beginners-create-a-dropdown-menu-from-scratch--9831d197
        <>
            <form><select>
                <option>Triangles</option>
                <option>Cube</option>
            </select></form>
            <WebGL
                positions={positions}
                colors={colors}
                clickGl={clickGl}
                triangleCount={6}
            />
        </>
    )

}

export default WebGLExample;