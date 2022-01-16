import React from 'react';

interface IDroppable {
    id: string;
    style: object;
    children: React.ReactNode;
}

const Droppable: React.FC<IDroppable> = props => {

    const drop = (e: any) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('transfer');
        e.target.appendChild(document.getElementById(data));
    }

    const allowDrop = (e: any) => {
        e.preventDefault();
    }

    return (
        <div id={props.id} onDrop={drop} onDragOver={allowDrop} style={props.style}>
            {props.children}
        </div>
    )
}

export default Droppable;