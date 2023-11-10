import React from 'react';
import './App.css';
import { useState } from 'react';

import { Box, Button, ButtonGroup, Container, DialogContentText, Grid, IconButton, TextField } from '@mui/material';
import { NavProps } from './interface/crudInterface';
import { Create, Update, Header } from './component/CrudComponent';
import { Nav } from "./component/Nav";
import ContextAPI from './component/ContextAPI';
import UseReducer from './component/UseReducer';
import StyledComponents from './component/StyledComponents';

function App() {
    const [mode, setMode] = useState('WELCOME');
    const [id, setId] = useState<number>(0);
    const [nextid, setNextId] = useState<number>(4)
    const [topics, setTopics] = useState<NavProps[]>([
        { id: 1, title: "html", body: "html is ..." },
        { id: 2, title: "css", body: "css is ..." },
        { id: 3, title: "tsx", body: "txs is ..." }
    ])

    let content: JSX.Element = <></>;
    let contextControl: JSX.Element = <></>;

    if (mode === "WELCOME") {
        //content = <Article title="Welcome" body="Hello, Web"></Article>
        content = <TextField
            id="outlined-read-only-input"
            label="Welcome"
            value="Hello, Web"
            multiline
            rows={4}
            InputProps={{
                readOnly: true,
            }}
        />
        contextControl =
            <Button variant="outlined" onClick={(event: any) => {
                event.preventDefault();
                setMode("CREATE");
            }
            }>Create</Button>
        // <a href="/create" onClick={(event: any) => {
        //     event.preventDefault();
        //     setMode("CREATE");
        // }}>Create</a>
    } else if (mode === "READ") {
        let title: string = "";
        let body: string = "";

        for (let i = 0; i < topics.length; i++) {

            if (id === topics[i].id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = <TextField
            id="outlined-read-only-input"
            label={title}
            value={body}
            multiline
            rows={4}
            InputProps={{
                readOnly: true,
            }}
        />
        contextControl = <>
            <ButtonGroup>
                <Button variant='outlined' onClick={(event: any) => {
                    event.preventDefault();
                    setMode("UPDATE");
                }}>Update</Button>
                <Button variant='contained' onClick={() => {
                    const newTopics: NavProps[] = [];
                    for (let i = 0; i < topics.length; i++) {

                        if (id != topics[i].id) {
                            newTopics.push(topics[i]);
                        }
                    }
                    setTopics(newTopics);
                    setMode("WELCOME");
                }}>Delete</Button>
            </ButtonGroup>
            {/* <a href={'/update/' + id} onClick={(event: any) => {
                event.preventDefault();
                setMode("UPDATE");
            }}>Update</a>
            <input type='button' value='Delete' onClick={() => {
                const newTopics: NavProps[] = [];
                for (let i = 0; i < topics.length; i++) {

                    if (id != topics[i].id) {
                        newTopics.push(topics[i]);
                    }
                }
                setTopics(newTopics);
                setMode("WELCOME");
            }}></input> */}
        </>
    } else if (mode === "CREATE") {
        content = <Create onCreate={(title: string, body: string) => {
            const newTopic: NavProps = { id: nextid, title: title, body: body };
            const newTopics: NavProps[] = [...topics];
            newTopics.push(newTopic);
            setTopics(newTopics);
            setMode("READ");
            setId(nextid);
            setNextId(nextid + 1);
        }} onCancel={() => {
            setMode("WELCOME");
        }}></Create >
    } else if (mode === "UPDATE") {
        let title: string = "";
        let body: string = "";
        for (let i = 0; i < topics.length; i++) {

            if (id === topics[i].id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = <Update title={title} body={body} onUpdate={(title: string, body: string) => {
            const updatedTopic: NavProps = { id: id, title: title, body: body };
            const newTopics: NavProps[] = [...topics];
            for (let i = 0; i < newTopics.length; i++) {
                if (id === newTopics[i].id) {
                    newTopics[i] = updatedTopic;
                    break;
                }
            }
            setTopics(newTopics);
            setMode("READ");
        }} onCancel={() => {
            setMode("READ");
        }}></Update>
    } else if (mode === "OTHERS") {
        if (id === 0) {
            content = <ContextAPI></ContextAPI>
            contextControl = <></>
        } else if (id === 1) {
            content = <UseReducer></UseReducer>
        } else if (id === 2) {
            content = <StyledComponents></StyledComponents>
        }
    }

    return (
        <Container style={{ marginLeft: '250px', marginTop: '80px' }}>
            <Header title="REACT" onChangeMode={() => {
                setMode("WELCOME");
            }}></Header>

            <Nav topics={topics} onChangeMode={(_id: number, _mode: string) => {
                console.log(_mode);
                setMode(_mode);
                setId(_id);
            }}></Nav>
            <Box
                component="div"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '30ch', },
                }}
            >
                {content}
            </Box>
            <Box
                component="div"
                sx={{
                    paddingLeft: '8px'
                }}
            >
                {contextControl}
            </Box>
        </Container >
    )
}

export default App;