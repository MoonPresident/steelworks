import React from 'react';

const WebGL: React.FC = (props: any) => {

    React.useEffect(() => {

    }, []);
    
    
    return (
        <canvas
            id="webgl"
            width="400"
            height="400"
            style={{ border: "1px solid black" }}
        >
        </canvas>
    )

}

export default WebGL;