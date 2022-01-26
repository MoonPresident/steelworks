import React, { useState, useEffect, useRef } from 'react';
import { reduceEachTrailingCommentRange } from 'typescript';
import BasicFragmentShader from './Shaders/fragmentShader';
import BasicVertexShader from './Shaders/vertexShader';
import Utils from "./utils";


//https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext
//https://github.com/cx20/webgl-physics-examples
//https://webgl2fundamentals.org/

const WebGL: React.FC = (props: any) => {

    const glRef = useRef<HTMLCanvasElement>(null);
    const [ gl, setgl ] = useState<WebGL2RenderingContext>();

    const [ program, setProgram ] = useState<WebGLProgram>();
    const [ vao, setVAO ] = useState<WebGLVertexArrayObject>();

    const [ canvasToDisplaySizeMap, setCanvasToDisplaySizeMap ] = useState<Map<any, any>>();

    useEffect(() => {
        const canvas = glRef.current;
        if(!canvas) { console.log("1"); return; }
        const context = canvas.getContext('webgl2');
        if(context == null) throw new Error('Could not get context');
        setgl(context);

        const vertexShader = Utils.generateShader(context, context.VERTEX_SHADER, BasicVertexShader);
        const fragmentShader = Utils.generateShader(context, context.FRAGMENT_SHADER, BasicFragmentShader);
        const VAO = context ?.createVertexArray();

        if(!vertexShader || !fragmentShader || !VAO) {console.log("2"); return; }

        const prog = Utils.generateProgram(context, vertexShader, fragmentShader);
        if(!prog) {console.log("3");return;}

        setProgram(prog);
        setVAO(VAO);
    }, []);

    useEffect(() => {
        const positionBuffer = gl?.createBuffer();
        if(!gl || !positionBuffer || !vao || !program) { return; }
        gl?.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        const positions = [0, 0,    0, 0.2 + Math.random(),     0.3 + Math.random(), 0];
        gl?.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        gl?.bindVertexArray(vao);

        const positionAttributeLocation = gl?.getAttribLocation(program, "a_position");
        if(positionAttributeLocation < 0) { return }
        gl?.enableVertexAttribArray(positionAttributeLocation);
        gl?.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        Utils.clear(gl, 0, 0, 0, 0);

        gl?.useProgram(program);
        gl?.bindVertexArray(vao);
        gl?.drawArrays(gl.TRIANGLES, 0, 3);
        gl?.bindBuffer(gl.ARRAY_BUFFER, null);
    });

    const clickGl = () => {
        // const elemBuffer = gl?.createBuffer();
        // if(elemBuffer) {
        //     gl?.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elemBuffer);
        //     gl?.bufferData(gl.ELEMENT_ARRAY_BUFFER, 
        //         new Float32Array([
        //             0, 1, 2
        //         ]),
        //         gl.STATIC_DRAW)
        //     gl?.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        // }
        
        //TODO: fix - Bad way of normalizing screen
        const rect = gl?.canvas.getBoundingClientRect();
        if(program && vao && glRef.current && rect?.width && rect.height) {
            const dpr = window.devicePixelRatio;
            const displayWidth  = Math.round(rect.width * dpr);
            const displayHeight = Math.round(rect.height * dpr);
            glRef.current.width = displayWidth;
            glRef.current.height = displayHeight;
            gl?.viewport(0, 0, gl.canvas.width, gl.canvas.height);

            const buffer = gl?.createBuffer();
            if(!buffer) {return;}
            
            gl?.bindBuffer(gl.ARRAY_BUFFER, buffer);

            const positions = [0, 0,    0, Math.random() * 0.8 + 0.2,     Math.random() * 0.7 + 0.3, 0];
            gl?.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
            gl?.bindVertexArray(vao);
    
            const positionAttributeLocation = gl?.getAttribLocation(program, "a_position");
            console.log(positionAttributeLocation)
            if(positionAttributeLocation === undefined || positionAttributeLocation < 0) { return }
            gl?.enableVertexAttribArray(positionAttributeLocation);
            gl?.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    
            gl?.clearColor(0, 0, 0, 0);
            gl?.clear(gl.COLOR_BUFFER_BIT);
    
            gl?.useProgram(program);
            gl?.drawArrays(gl.TRIANGLES, 0, 3);
            
        }
    };

    return (
        <canvas
            ref={glRef}
            width="100*vw"
            height="100*vh"
            style={{ border: "1px solid black", boxSizing: "border-box"}}
            onClick={(e) => {clickGl();}}
        >
        </canvas>
    )

}

export default WebGL;