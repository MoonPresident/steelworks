import React from "react";

namespace Utils {
    export function clear(gl:WebGL2RenderingContext, r: number, g: number, b: number, a: number) {
        gl.clearColor(r, g, b, a);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    export function generateShader(gl: WebGL2RenderingContext, type: number, source: string) {
        const shader = gl.createShader(type);
        if(!shader) { return }

        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { return shader; }
       
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }

    export const generateProgram = (gl: WebGL2RenderingContext, vertexShader: any, fragmentShader: any) => {
        const program = gl.createProgram();
        if(!program) { return }

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (gl.getProgramParameter(program, gl.LINK_STATUS)) { return program; }
       
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }

}

export default Utils;
