import React from 'react';
import styled from 'styled-components';
import Sudoku from '../../components/Puzzles/Sudoku';

const Wrapper = styled.div`
    width: 100%;
    padding: 32px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Cell = styled.div`
    width: 21px;
    height: 21px;
    padding: 10px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const Puzzles: React.FC = props => {
    const [ droppables, setDroppables ] = React.useState<Array<any>>([
        { id: "drop1", children: {} },
        { id: "drop2", children: {} }
    ]);

    const addDraggable = () => {
        
    } 

    const addDroppable = () => {
        setDroppables([
            ...droppables,
            { id: "some bollocks", children: {} }
        ]);
    }

    React.useEffect(() => {
        
    }, [])

    return (
        <Wrapper>
            <Sudoku/>
        </Wrapper>
    )
}

export default Puzzles;