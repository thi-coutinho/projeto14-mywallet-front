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
    min-height:100vh;
    background-color: ${PURPLE};
    display:flex;
    justify-content:center;
    
`