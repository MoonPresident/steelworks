import React from 'react';
import WebGLExample from './WebGLExample';
import DnDExample from './DnDExample';
import Puzzles from './Puzzles';
import styled, { ThemeProvider } from 'styled-components';
import Link from 'next/link';

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
  justify-content: flexStart;
  height: 100vh;
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
    targetIndex: any;
}

class App extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props);

        this.state = {
            targetIndex: 0,
        };
    }

    private programs = [ 
        { component: <WebGLExample/>, description: "WebGL2 Example" },
        { component: <DnDExample/>, description: "Drag and Drop Example" },
        { component: <Puzzles/>, description: "Puzzles"}
        //https://reindernijhoff.net/2019/03/wolfenstein-raytracing-on-using-webgl1/
        //Blender Model Renderer
        //InfoSec
        //Architecture
        //Devops
        //ML/DL/AI
    ];

    render() {
        return (
            <ThemeProvider theme={theme}>
                <AppWrapper>    
                    <Topbar>
                        <Title>Thomas Steel</Title>
                        { this.programs.map((program, key) => {
                            return (
                                <PageTitle 
                                    key={key}
                                    onClick={e=>this.setState({...this.state, targetIndex: key})}
                                >
                                    {program.description}
                                </PageTitle>
                            )    
                        })}
                        {/* <nav><Link href="/pages/DnDExample">DnD Example</Link></nav> * THIS IS NOT IT EITHER. */}
                    </Topbar>

                    {/* Render program */}
                    <div style={{"flex": "auto", "height":"calc(100vh - 78px)"}}>
                    { this.programs[this.state.targetIndex].component }
                    </div>
                </AppWrapper>
            </ThemeProvider>
        )
    }
}

export default App;