import React from 'react';
import './App.css';
import FolderIcon from '@mui/icons-material/Folder';
import { useState } from 'react';

import { AppBar, Box, Button, ButtonGroup, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Toolbar, Typography } from '@mui/material';
interface HeaderProps {
    title: string;
    onChangeMode: () => void;
}

interface NavPropsList {
    topics: NavProps[];
    onChangeMode: (_id: number) => void;
}

interface NavProps {
    id: number;
    title: string;
    body: string;
}

interface CreateProps {
    onCreate: (title: string, body: string) => void;
    onCancel: () => void;
}

interface UpdateProps {
    title: string;
    body: string;
    onUpdate: (title: string, body: string) => void;
    onCancel: () => void;
}

function Header(props: HeaderProps) {
    return <>
        <AppBar
            position="fixed"
            sx={{ width: `calc(100% - 240px)`, ml: `240px` }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    component="a"
                    sx={{ flexGrow: 1, cursor: 'pointer', display: { xs: 'none', sm: 'block' }, textDecoration: "none", color: "inherit" }}
                    onClick={(event: any) => {
                        event.preventDefault();
                        props.onChangeMode();
                    }}
                >
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
    </>
    // <header>
    //     <h1><a href="/" onClick={(event: any) => {
    //         event.preventDefault();
    //         props.onChangeMode();
    //     }}>{props.title}</a></h1>
    // </header>
}

function Nav(props: NavPropsList) {
    const lis: NavProps[] = props.topics;

    const renderedLis = lis.map((item) => (
        <li key={item.id}><a id={item.id.toString()} href={"/read/" + item.id} onClick={(event: any) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
        }}>{item.title}</a></li>
    ));
    return <nav>
        <Drawer
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left">
            <Toolbar />
            <Divider />
            <List sx={{ paddingLeft: '10px' }}>
                {lis.map((nav, index) => (
                    <ListItem key={nav.id} disablePadding>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>

                        <ListItemButton onClick={(event: any) => {
                            event.preventDefault();
                            props.onChangeMode(Number(nav.id));
                        }}>
                            <ListItemText primary={nav.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    </nav>
}

function Create(props: CreateProps) {
    const [open, setOpen] = React.useState(true);
    const [title, setTitle] = React.useState("");
    const [body, setBody] = React.useState("");

    const handleClose = () => {
        setOpen(false);
        props.onCancel();
    };

    return <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                onChange={(event: any) => { setTitle(event.target.value); }}
            />
            <TextField
                autoFocus
                margin="dense"
                id="body"
                label="Body"
                type="text"
                fullWidth
                rows={4}
                variant="standard"
                onChange={(event: any) => { setBody(event.target.value); }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={(event: any) => {
                event.preventDefault();
                props.onCreate(title, body);
            }}>Create</Button>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
    </Dialog>

    /*<article>
        <h2>Create</h2>
        <form onSubmit={(event: any) => {
            event.preventDefault();
            const title: string = event.target.title.value;
            const body: string = event.target.body.value;
            props.onCreate(title, body)
        }}>
            <p><input type='text' name='title' placeholder='title' /></p>
            <p><textarea name='body' placeholder='body' /></p>
            <p><input type='submit' value='Create'></input></p>
        </form>
    </article>*/
}

function Update(props: UpdateProps) {
    const [open, setOpen] = React.useState(true);
    const [title, setTitle] = useState(props.title);
    const [body, setBody] = useState(props.body);

    const handleClose = () => {
        setOpen(false);
        props.onCancel();
    };

    return <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                onChange={(event: any) => { setTitle(event.target.value); }}
            />
            <TextField
                margin="dense"
                id="outlined-read-only-input"
                label="Body"
                multiline
                fullWidth
                rows={4}
                onChange={(event: any) => { setBody(event.target.value); }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={(event: any) => {
                event.preventDefault();
                props.onUpdate(title, body);
            }}>Create</Button>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
    </Dialog>

    /*<article>
        <h2>Update</h2>
        <form onSubmit={(event: any) => {
            event.preventDefault();
            const title: string = event.target.title.value;
            const body: string = event.target.body.value;
            props.onUpdate(title, body);
        }}>
            <p><input type='text' name='title' value={title} onChange={(event: any) => {
                setTitle(event.target.value);
            }} /></p>
            <p><textarea name='body' value={body} onChange={(event: any) => {
                setBody(event.target.value);
            }} /></p>
            <p><input type='submit' value='Update' /></p>
        </form>
    </article>*/
}

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
    }

    return (
        <Container style={{ marginLeft: '250px', marginTop: '80px' }}>
            <Header title="REACT" onChangeMode={() => {
                setMode("WELCOME");
            }}></Header>

            <Nav topics={topics} onChangeMode={(_id: number) => {
                setMode("READ");
                setId(_id);
                console.log(_id);
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