const vertexShader=
`#version 300 es
in vec4 a_position;

//uniform mat4 u_matrix;

void main() {
    gl_Position = a_position;
}`;

export default vertexShader;