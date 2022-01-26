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
    const [ context2D, setContext2D ] = useState<CanvasRenderingContext2D>();
    const [ gl, setgl ] = useState<WebGL2RenderingContext>();

    const [ program, setProgram ] = useState<WebGLProgram>();
    const [ VAO, setVAO ] = useState<WebGLVertexArrayObject>();

    const [ canvasToDisplaySizeMap, setCanvasToDisplaySizeMap ] = useState<Map<any, any>>();

    // const clear = (r: number, g: number, b: number, a: number) => {
    //     gl.clearColor(r, g, b, a);
    //     gl.clear(gl.COLOR_BUFFER_BIT);
    // }

    const generateShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
        const shader = gl.createShader(type);
        if(!shader) { return }

        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { return shader; }
       
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }

    const generateProgram = (gl: WebGL2RenderingContext, vertexShader: any, fragmentShader: any) => {
        const program = gl.createProgram();
        if(!program) { return }

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (gl.getProgramParameter(program, gl.LINK_STATUS)) { return program; }
       
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }

    useEffect(() => {
        const canvas = glRef.current;
        if(!canvas) { return; }
        const context = canvas.getContext('webgl2');
        if (context == null) throw new Error('Could not get context');
        setgl(context);

        const vertexShader = generateShader(context, context.VERTEX_SHADER, BasicVertexShader);
        const fragmentShader = generateShader(context, context.FRAGMENT_SHADER, BasicFragmentShader);
        const positionBuffer = context?.createBuffer();
        var vao = context?.createVertexArray();

        if(!vertexShader || !fragmentShader || !positionBuffer || !vao) { return }

        //success = gl.getShaderParameter(shader, context.COMPILE_STATUS);
        const prog = generateProgram(context, vertexShader, fragmentShader);
        if(!prog) return;

        setProgram(prog);
        setVAO(vao);

        context?.bindBuffer(context.ARRAY_BUFFER, positionBuffer);

        const positions = [0, 0,    0, 0.5,     0.7, 0];
        context?.bufferData(context.ARRAY_BUFFER, new Float32Array(positions), context.STATIC_DRAW);

        context?.bindVertexArray(vao);

        const positionAttributeLocation = context?.getAttribLocation(prog, "a_position");
        if(positionAttributeLocation < 0) { return }
        context?.enableVertexAttribArray(positionAttributeLocation);
        context?.vertexAttribPointer(positionAttributeLocation, 2, context.FLOAT, false, 0, 0);

        context?.clearColor(0, 0, 0, 0);
        context?.clear(context.COLOR_BUFFER_BIT);

        context?.useProgram(prog);
        context?.bindVertexArray(vao);
        context?.drawArrays(context.TRIANGLES, 0, 3);
        context?.bindBuffer(context.ARRAY_BUFFER, null);
    }, []);

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
        if(program && VAO && glRef.current && rect?.width && rect.height) {
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
    
            gl?.bindVertexArray(VAO);
    
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