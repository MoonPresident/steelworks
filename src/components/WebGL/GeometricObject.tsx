

// const randCoord = () => {
//     return 2 * Math.random() - 1;
// };

// const randCol = () => {
//     return Math.floor(255 * Math.random());
// };

abstract class GeometricObject {
    private vertices: Float32Array;
    private colors: Uint8Array;

    private translate: Float32Array;
    private rotate: Float32Array;
    private scale: Float32Array;

    constructor() {
        this.vertices = new Float32Array();
        this.colors = new Uint8Array();
        
        this.translate = new Float32Array();
        this.rotate = new Float32Array();
        this.scale = new Float32Array();
    }
    
    abstract generateVertices(): void;
    setVertices(_vertices: Float32Array): void {
        this.arrayCopy(_vertices, this.vertices);
    }
    getVertices(): Float32Array {
        return this.vertices;
    }
    
    abstract generateColors(): void;
    setColors(_colors: Uint8Array): void {
        this.arrayCopy(_colors, this.colors);
    }
    getColors(): Uint8Array {
        return this.colors;
    }

    private arrayCopy(arrFrom: Float32Array, arrTo: Float32Array): void;
    
    private arrayCopy(arrFrom: Uint8Array, arrTo: Uint8Array): void;
    
    private arrayCopy(arrFrom: any, arrTo: any): void {
        for(let i = 0; i < arrFrom.length; i++) {
            arrTo[i] = arrFrom[i];
        }
    }

    setTranslate(matrix: Float32Array): void {
        this.arrayCopy(matrix, this.translate);
    };
    getTranslate(): Float32Array {
        return this.translate;
    }
    
    setRotate(matrix: Float32Array): void {
        this.arrayCopy(matrix, this.rotate);
    }
    getRotate(): Float32Array {
        return this.rotate;
    }

    setScale(matrix: Float32Array): void {
        this.arrayCopy(matrix, this.scale);
    }
    getScale(): Float32Array {
        return this.scale;
    }

}

export default GeometricObject;