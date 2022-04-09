import GeometricObject from "./GeometricObject";

export default class Triangle extends GeometricObject {
    generateColors(): void {
        this.colors = new Uint8Array([
            this.randCol(), this.randCol(), this.randCol(), 1,
            this.randCol(), this.randCol(), this.randCol(), 1,
            this.randCol(), this.randCol(), this.randCol(), 1,
            this.randCol(), this.randCol(), this.randCol(), 1,
            this.randCol(), this.randCol(), this.randCol(), 1,
            this.randCol(), this.randCol(), this.randCol(), 1
        ]);
    }

    generateVertices(): void {
        this.vertices = new Float32Array([
            this.randCoord(), this.randCoord(), 0, 1,
            this.randCoord(), this.randCoord(), 0, 1,
            this.randCoord(), this.randCoord(), 0, 1,
            this.randCoord(), this.randCoord(), 0, 1,
            this.randCoord(), this.randCoord(), 0, 1,
            this.randCoord(), this.randCoord(), 0, 1,
        ])
    }
}