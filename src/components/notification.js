import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { WHITE } from "../constants/colors";

export default function PopUp({ isVisible, children }) {
    return (
        <AnimatePresence>
            {
                isVisible &&
                <Conteiner
                    initial={{ scale: 0 }}
                    animate={{ rotate: 360, scale: 1 }}
                    exit={{ rotate: 0, scale: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}

                >
                    <ion-icon name="checkmark-done-outline"></ion-icon>
                    {children}
                </Conteiner>
            }
        </AnimatePresence>
    )
}

const Conteiner = styled(motion.div)`
    z-index:3;
    position:absolute;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    gap: 5px;
    color:${WHITE};
    font-family:'Raleway', sans-serif;
    font-size:16px;
    line-height:23px;
    ion-icon {
        z-index:4;
        color:white;
        font-size:60px;
    }
    font-weight:700;
    top: 10px;
    right: 10px;
    width:140px;
    height: 60px;
    border-radius:10px;
    padding:10px;
    background: rgb(177,255,155);
    background: linear-gradient(0deg, rgba(177,255,155,1) 0%, rgba(49,161,55,1) 100%);

;
`
