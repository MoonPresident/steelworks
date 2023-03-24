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

    export const setVertexAttribPointer = (
            gl: WebGL2RenderingContext, 
            program: WebGLProgram, 
            attrib: string,
            size: number, 
            type: GLenum, 
            normalized: boolean, 
            stride: number, 
            offset: number
    ) => {
        const attribLocation = gl?.getAttribLocation(program, attrib);
        if(attribLocation === undefined || attribLocation < 0) { return }
        
        gl?.enableVertexAttribArray(attribLocation);
        gl?.vertexAttribPointer(attribLocation, size, type, normalized, stride, offset);
    }

    export const onResize = (entry: any) => {
        let width;
        let height;
        let dpr = window.devicePixelRatio;
        if (entry.devicePixelContentBoxSize) {
            // NOTE: Only this path gives the correct answer
            // The other paths are imperfect fallbacks
            // for browsers that don't provide anyway to do this
            width = entry.devicePixelContentBoxSize[0].inlineSize;
            height = entry.devicePixelContentBoxSize[0].blockSize;
            dpr = 1; // it's already in width and height
        } else if (entry.contentBoxSize) {
            const box = entry.contentBoxSize[0] ? entry.contentBoxSize[0] : entry.contentBoxSize;
            width = box.inlineSize;
            height = box.blockSize;
        } else {
            width = entry.contentRect.width;
            height = entry.contentRect.height;
        }
        
        const displayWidth = Math.round(width * dpr);
        const displayHeight = Math.round(height * dpr);
        return { displayWidth, displayHeight }
    }

}

export default Utils;
