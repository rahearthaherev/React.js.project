import { Box } from "@mui/material";
import styled from "styled-components"

export default function StyledComponents() {
    const SimpleButton = styled.button`
        color: red;
        background-color: white;
    `;
    const ChildButton = styled(SimpleButton)`
        font-size: 50px;
    `;

    function ReactButton(props: any) {
        return <button className={props.className}>{props.children}</button>
    }
    const ReactChildButton = styled(ReactButton)`
        font-size: 50px;
    `;

    return <>
        <Box>
            <SimpleButton>Simple</SimpleButton>
            <ChildButton>ChildButton</ChildButton>
            <ReactButton>React</ReactButton>
            <ReactChildButton>ReactChildButton</ReactChildButton>
        </Box>
    </>
}