import FolderIcon from "@mui/icons-material/Folder";
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import React from "react";
import { NavProps } from "../interface/crudInterface";
import { NavPropsList } from "../interface/NavPropsList";

export function Nav(props: NavPropsList) {
    const lis: NavProps[] = props.topics;

    // const renderedLis = lis.map((item) => (
    //     <li key={item.id}><a id={item.id.toString()} href={"/read/" + item.id} onClick={(event: any) => {
    //         event.preventDefault();
    //         props.onChangeMode(Number(event.target.id));
    //     }}>{item.title}</a></li>
    // ));
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
            <List>
                {lis.map((nav) => (
                    <ListItemButton onClick={(event: any) => {
                        event.preventDefault();
                        props.onChangeMode(Number(nav.id), "READ");
                    }}>
                        <ListItem key={nav.id} disablePadding>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText primary={nav.title} />
                        </ListItem>
                    </ListItemButton>
                ))}
            </List>
            <Divider />
            <List>
                <ListItemButton onClick={(event: any) => {
                    event.preventDefault();
                    props.onChangeMode(0, "OTHERS");
                }}>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="context API" />
                    </ListItem>
                </ListItemButton>
                <ListItemButton onClick={(event: any) => {
                    event.preventDefault();
                    props.onChangeMode(1, "OTHERS");
                }}>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="useReducer" />
                    </ListItem>
                </ListItemButton>
                <ListItemButton onClick={(event: any) => {
                    event.preventDefault();
                    props.onChangeMode(2, "OTHERS");
                }}>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="SytledComponents" />
                    </ListItem>
                </ListItemButton>
            </List>
        </Drawer>
    </nav>;
}
