import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { CreateProps, HeaderProps, UpdateProps } from "../interface/crudInterface";


export function Header(props: HeaderProps) {
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
    </>;
    // <header>
    //     <h1><a href="/" onClick={(event: any) => {
    //         event.preventDefault();
    //         props.onChangeMode();
    //     }}>{props.title}</a></h1>
    // </header>
}
export function Create(props: CreateProps) {
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
                onChange={(event: any) => { setTitle(event.target.value); }} />
            <TextField
                autoFocus
                margin="dense"
                id="body"
                label="Body"
                type="text"
                fullWidth
                rows={4}
                variant="standard"
                onChange={(event: any) => { setBody(event.target.value); }} />
        </DialogContent>
        <DialogActions>
            <Button onClick={(event: any) => {
                event.preventDefault();
                props.onCreate(title, body);
            }}>Create</Button>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
    </Dialog>;

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
export function Update(props: UpdateProps) {
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
                onChange={(event: any) => { setTitle(event.target.value); }} />
            <TextField
                margin="dense"
                id="outlined-read-only-input"
                label="Body"
                multiline
                fullWidth
                rows={4}
                onChange={(event: any) => { setBody(event.target.value); }} />
        </DialogContent>
        <DialogActions>
            <Button onClick={(event: any) => {
                event.preventDefault();
                props.onUpdate(title, body);
            }}>Create</Button>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
    </Dialog>;

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
