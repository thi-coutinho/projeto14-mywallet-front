import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { PURPLE } from "../constants/colors";
import { useToken } from "../context/TokenProvider";

export default function BaseScreen({ children }) {
    const token = useToken()
    return (
        <AnimatePresence mode="wait">
            <Screen token={token}>
                {children}

            </Screen>

        </AnimatePresence>

    )
}

const Screen = styled.div`
    background-color: ${PURPLE};
    max-width:420px;
    min-height:100vh;
    margin: auto;
    inset:0;
    &> div{
        display:flex;
        flex-direction:column;
        max-width:420px;
        min-height:100vh;
        padding-top:5vb;
        inset:0;
        margin: auto;
        background-color: ${PURPLE};

    }
`