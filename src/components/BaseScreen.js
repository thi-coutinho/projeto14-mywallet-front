import styled from "styled-components";
import { PURPLE } from "../constants/colors";
import { useToken } from "../context/TokenProvider";

export default function BaseScreen({children}){
    const token = useToken()
    return (
        <Screen token={token}>
            {children}
        </Screen>

    )
}

const Screen = styled.div`
    max-width:420px;
    min-height:100vh;
    padding-top:25px;
    inset:0;
    margin: auto;
    background-color: ${PURPLE};
`