import { Box, Button, ButtonGroup, Grid, TextField, Typography } from "@mui/material";
import { useReducer, useState } from "react";

export default function UseReducer() {
    const [countForState, setCountForState] = useState(0);

    function upForState() {
        setCountForState(countForState + settingNum);
    }
    function downForState() {
        setCountForState(countForState - settingNum);
    }
    function initForState() {
        setCountForState(0);
    }

    const [settingNum, setSettingNum] = useState(0);
    const [countForReduce, countDispatch] = useReducer(countReducer, 0);

    function countReducer(oldCount: number, action: { type: string; num: number; }) {
        if (action.type === 'UP') {
            return oldCount + action.num;
        } else if (action.type === 'DOWN') {
            return oldCount - action.num;
        } else {
            return 0
        }
    }
    function upForReduce() {
        countDispatch({ type: 'UP', num: settingNum });
    }
    function downForReduce() {
        countDispatch({ type: 'DOWN', num: settingNum });
    }
    function initForReduce() {
        countDispatch({ type: 'INIT', num: settingNum });
    }


    return <>
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Typography variant="h4" sx={{ margin: "10px" }}>
                    useState : {countForState}
                </Typography>
                <ButtonGroup>
                    <Button onClick={upForState}>+</Button>
                    <Button onClick={initForState}>0</Button>
                    <Button onClick={downForState}>-</Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={2}>
                <TextField
                    value={settingNum}
                    placeholder="NumberSet"
                    fullWidth
                    type="number"
                    variant="outlined"
                    style={{ width: "100px" }}
                    onChange={(event: any) => { setSettingNum(Number(event.target.value)); }}></TextField>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="h4" sx={{ margin: "10px" }}>
                    useReducer : {countForReduce}
                </Typography>
                <ButtonGroup>
                    <Button onClick={upForReduce}>+</Button>
                    <Button onClick={initForReduce}>0</Button>
                    <Button onClick={downForReduce}>-</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    </>
}