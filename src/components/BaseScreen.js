import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { PURPLE } from "../constants/colors";
import { useToken } from "../context/TokenProvider";

export default function BaseScreen({ children }) {
    const location = useLocation()
    const token = useToken()
    return (
        <AnimatePresence mode="wait" initial={false}>
            <Screen location={location} key={location.pathname} token={token}
                initial={{ opacity: 0, x: '10%', rotateZ: '10deg' }}
                animate={{ opacity: 1, x: 0, rotateZ: 0 }}
                exit={{ opacity: 0, x: '-10%', rotateZ: '-10deg' }}
                transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 25,
                }}

            >

                {children}


            </Screen>
        </AnimatePresence>

    )
}

const Screen = styled(motion.div)`
    display:flex;
    flex-direction:column;
    max-width:420px;
    min-height:100vh;
    padding-top:5vb;
    inset:0;
    margin: auto;
    background-color: ${PURPLE};
`