import React from 'react';
import WebGL from '../WebGL';
import DnDExample from '../DnD/DnDExample';
import styled, { ThemeProvider } from 'styled-components';

//https://css-tricks.com/dry-ing-up-styled-components/

const theme = {
    primary: {
        backgroundColor: "DodgerBlue",
        '&:hover': {
            backgroundColor: "#1E40AA",
        },
        '&:active': {
            backgroundColor: "#1E0044",
        },
    }
}

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Topbar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flexStart;
    min-height: 72px;
    background-color: DodgerBlue;
`;

const Title = styled.h2`
    color: white;
    padding: 0 8px 0 8px;
    box-sizing: border-box;
`;

const PageTitle = styled.h4`
    color: white;
    padding: 0px 8px 4px 8px;
    box-sizing: border-box;
    align-self: flex-end;
    cursor: default;
    backgroundColor: ${props=>props.theme.primary};
    border-radius: 10px;
`;

interface AppState {
    target: any;
}

class App extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props);

        this.state = {
            target: <DnDExample/>,
        };
    }

    render() {
        return (
            <AppWrapper>
                <ThemeProvider theme={theme}>
                    <Topbar>
                        <Title>Thomas Steel</Title>
                        <PageTitle 
                            onClick={e=>{console.log(e);this.setState({...this.state, target: <DnDExample/>})}}>
                            Drag and Drop Example
                        </PageTitle>
                        <PageTitle 
                            onClick={e=>{console.log(e);this.setState({...this.state, target: <WebGL/>})}}>
                            WebGL2 Example
                        </PageTitle>
                    </Topbar>
                    {this.state.target}
                </ThemeProvider>
            </AppWrapper>
        )
    }
}

export default App;