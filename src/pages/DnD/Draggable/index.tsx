import React from 'react';

interface IDraggable {
    id: string;
    style: object;
    children: React.ReactNode;
}

const Draggable: React.FC<IDraggable> = props => {

    const drag = (e: any) => {
        e.dataTransfer.setData('transfer', e.target.id);
    }

    const noAllowDrop = (e: any) => {
        e.stopPropagation();
    }

    return (
        <div id={props.id} draggable="true" onDragStart={drag} onDragOver={noAllowDrop} style={props.style}>
            {props.children}
        </div>
    )
}

export default Draggable;