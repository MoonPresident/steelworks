import { render } from '@testing-library/react';
import React from 'react';
import styled from 'styled-components';
import * as wasm from "../../../latin-generator/pkg/latin_generator";

const Cell = styled.div`
    width: 21px;
    height: 21px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
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

const Sudoku: React.FC = props => {

    const [ sudoku, setSudoku ] = React.useState<wasm.DisplayMatrix>(
        wasm.sudoku()
    )

    const getSudoku = () => {
        let rows = [];
        for (let i = 0; i < sudoku.n; i++) {
            let children = [];
            for (let j = 0; j < sudoku.n; j++) {
                let cell = <Cell key={j}> {sudoku.data[i * sudoku.n + j]} </Cell>;
                children.push(cell);
            }
            rows.push(<Row key={i} > 
                {children.map((child)=> { return child; })} 
            </Row>);
        }
        let grid = <div key={"sudoku"} children={rows}/>;
        console.log(grid);
        return grid;
    }

    return (
        <div>
            <Row> 1 2 3 4 5 6 7 8 9 </Row>
            { getSudoku() }
        </div>
    )
}

export default Sudoku;