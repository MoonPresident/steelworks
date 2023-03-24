import GeometricObject from "./GeometricObject";

export default class Cube extends GeometricObject {
    generateColors(): void {
        this.colors = new Uint8Array([
            1, 1, 1, 1,
            1, 1, -1, 1,
            1, -1, 1, 1,
            -1, 1, 1, 1,
            1, -1, -1, 1,
            -1, 1, -1, 1,
            -1, -1, 1, 1,
            -1, -1, -1, 1,
        ]);
    }

    generateVertices(): void {
        this.vertices = new Float32Array([
            this.randCoord(), 0, this.randCoord(), 1,
            this.randCoord(), 0, this.randCoord(), 1,
            this.randCoord(), 0, this.randCoord(), 1,
            this.randCoord(), 0, this.randCoord(), 1,
            this.randCoord(), 0, this.randCoord(), 1,
            this.randCoord(), 0, this.randCoord(), 1,
        ])
    }
}