import React from 'react';
import Draggable from '../Draggable';
import Droppable from '../Droppable';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    padding: 32px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    `;
    
    const Item = styled.div`
    padding: 8px;
    color: #555;
    background-color: white;
    border-radius: 3px;
    `;
    
const droppableStyle = {
    backgroundColor: '#555',
    width: '250px',
    height: '400px',
    margin: '32px'
}

const Container = styled.div` 
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;


const DnDExample: React.FC = props => {
    const [ droppables, setDroppables ] = React.useState<Array<any>>([
        {id: "drop1", children: { } },
        {id: "drop2", children: { } }
    ]);

    const addDraggable = () => {
        
    } 

    const addDroppable = () => {
        setDroppables([
            ...droppables,
            {id: "some bollocks", children: {}}
        ]);
    }


    return (
        <Wrapper>
            <Container>
                <button onClick={addDroppable}>Add Box</button>
                <button onClick={addDraggable}>Add Item</button>
            </Container>
            <Container>
                {
                    droppables.map((item: any, i: any) =>{
                        return ( 
                        <Droppable id ={"drop" + i} style={droppableStyle}>
                            <Draggable id={"drag" + i} style={{margin: '8px'}}><Item>Lorem ipsem {i}</Item></Draggable>
                        </Droppable>)
                    })
                }
            </Container>
        </Wrapper>
    )
}

export default DnDExample;