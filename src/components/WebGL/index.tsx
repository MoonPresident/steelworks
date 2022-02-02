import React, { useState, useEffect, useRef } from 'react';
import BasicFragmentShader from '../../pages/WebGLExample/Shaders/fragmentShader';
import BasicVertexShader from '../../pages/WebGLExample/Shaders/vertexShader';
import Utils from "./utils";


//https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext
//https://github.com/cx20/webgl-physics-examples
//https://webgl2fundamentals.org/

interface WebGLProps {
    positions: Array<number>,
    colors: Array<number>,
    clickGl: Function,
    triangleCount: number,
}

const WebGL: React.FC<WebGLProps> = (props: WebGLProps) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ gl, setgl ] = useState<WebGL2RenderingContext>();

    const [ program, setProgram ] = useState<WebGLProgram>();
    const [ vao, setVAO ] = useState<WebGLVertexArrayObject>();

    const [ canvasToDisplaySizeMap, setCanvasToDisplaySizeMap ] = useState<Map<any, any>>();

    const [ positionBuffer, setPositionBuffer ] = useState<WebGLBuffer>();
    const [ colorBuffer, setColorBuffer ] = useState<WebGLBuffer>();
    const onResize = (entries: any) => {
        const newCanvasToDisplaySizeMap = new Map();
        for (const entry of entries) {
            const { displayWidth, displayHeight } = Utils.onResize(entry);
            newCanvasToDisplaySizeMap.set(entry.target, [displayWidth, displayHeight]);
          }
          setCanvasToDisplaySizeMap(newCanvasToDisplaySizeMap);
    }

    useEffect(() => {
        console.log("Updating canvas.")
        const canvas = canvasRef.current;
        if(!canvas) { console.log("ERROR: Canvas could not initialize."); return; }
        const context = canvas.getContext('webgl2');
        if(context == null) throw new Error('Could not get context');
        setgl(context);

        //Configure WebGL
        // context.enable(context.CULL_FACE);
        context.enable(context.DEPTH_TEST);
        context.depthFunc(context.LEQUAL);  

        //Configure webgl program
        const vertexShader = Utils.generateShader(context, context.VERTEX_SHADER, BasicVertexShader);
        const fragmentShader = Utils.generateShader(context, context.FRAGMENT_SHADER, BasicFragmentShader);
        const VAO = context?.createVertexArray();

        if(!vertexShader || !fragmentShader || !VAO) {console.log("ERROR: Problem initializing shaders and vao."); return; }

        const prog = Utils.generateProgram(context, vertexShader, fragmentShader);
        if(!prog) {console.log("ERROR: Problem generating program.");return;}

        setProgram(prog);
        setVAO(VAO);

        const newPositionBuffer = context?.createBuffer();
        const newColorBuffer = context?.createBuffer();
        if(!newPositionBuffer || !newColorBuffer) {return;}
        setPositionBuffer(newPositionBuffer);
        setColorBuffer(newColorBuffer);

        context.bindVertexArray(VAO);
        context.bindBuffer(context.ARRAY_BUFFER, newPositionBuffer);
        Utils.setVertexAttribPointer(context, prog, "a_position", 4, context.FLOAT, false, 0, 0);

        context.bindBuffer(context.ARRAY_BUFFER, newColorBuffer);
        Utils.setVertexAttribPointer(context, prog, "a_color", 3, context.UNSIGNED_BYTE, true, 0, 0);
        
        const resizeObserver = new ResizeObserver(onResize);
        try {
          // only call us of the number of device pixels changed
          resizeObserver.observe(canvas, {box: 'device-pixel-content-box'});
        } catch (ex) {
          // device-pixel-content-box is not supported so fallback to this
          resizeObserver.observe(canvas, {box: 'content-box'});
        }
        setCanvasToDisplaySizeMap(new Map([[canvas, [300, 150]]]));
    }, [canvasRef]);

    const renderWebGL = () => {
        const canvas = canvasRef.current;
        if(!program || !vao || !gl || !canvas || !canvasToDisplaySizeMap
           || !positionBuffer || !colorBuffer) { return; }
        
        // Check and update the canvas if not the same size.
        const [displayWidth, displayHeight] = canvasToDisplaySizeMap.get(canvas)

        if (canvas.width  !== displayWidth || canvas.height !== displayHeight) {
            canvas.width  = displayWidth;
            canvas.height = displayHeight;
            
            gl?.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        }
        

        gl?.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl?.bufferData(gl.ARRAY_BUFFER, new Float32Array(props.positions), gl.DYNAMIC_DRAW);

        gl?.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl?.bufferData(gl.ARRAY_BUFFER, new Uint8Array(props.colors), gl.DYNAMIC_DRAW); 
 
        Utils.clear(gl, 0, 0, 0, 0);

        gl?.useProgram(program);
        gl?.drawArrays(gl.TRIANGLES, 0, props.triangleCount);
        gl?.bindBuffer(gl.ARRAY_BUFFER, null);
        
    }

    useEffect(() => {
       renderWebGL();
    });

    useEffect(() => {
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
        renderWebGL();
    }, [props.positions]);

    useEffect(()=>{}, []);

    return (
        <canvas
            ref={canvasRef}
            width="100vw"
            height="100vh"
            style={{ width: "100%", height: "100%", boxSizing: "border-box" }}
            onClick={(e) => {props.clickGl();}}
        >
        </canvas>
    )

}

export default WebGL;