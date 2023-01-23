import styled from "styled-components";
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
    min-height:100vh;
    padding:70px 0 100px;
    background-color: #8C11BE;
    display:flex;
    justify-content:center;
    align-items:center;
    
`