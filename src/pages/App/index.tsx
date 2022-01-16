import React from 'react';
import WebGL from '../WebGL';
import DnDExample from '../DnD/DnDExample';
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 100px;
`;

const Container = styled.div`
`;


class App extends React.Component {
    constructor(props: any) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <AppWrapper>
                <Container>
                    <DnDExample/>
                </Container>
                <WebGL/>
            </AppWrapper>
        )
    }
}

export default App;

