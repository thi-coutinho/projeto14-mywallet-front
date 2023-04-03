import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { WHITE } from "../constants/colors";
import { useSetToken, useToken } from "../context/TokenProvider";


export default function Title({ text }) {
    const navigate = useNavigate()
    const location = useLocation()
    const token = useToken()
    const setToken = useSetToken()
    
    if (location.pathname === "/home") {
        function exit() {
            Object.keys(token).forEach(el => localStorage.removeItem(el))
            setToken({})
            navigate("/")
        }
        return (
            <HelloText>
                    <span> Olá, {`${token.name}`}</span>
                    <ion-icon onClick={exit} name="exit-outline"></ion-icon>
            </HelloText>
        )
    }
    return (
        <Container>
            <ion-icon onClick={() => navigate(-1)} name="arrow-back-circle-outline"></ion-icon>
            {text}
        </Container>

    )
}


const Container = styled.div`
    display: flex;
    align-items:center;
    gap:1rem;
    margin: 0 36px 12px;
    font-family:'Raleway', Courier, monospace ;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: ${WHITE};
    ion-icon {
    :hover, :focus {
            cursor: pointer;
            transition:all 0.2s ease-in;
            --ionicon-stroke-width: 64px;
        }
    }
`

const HelloText = styled.div`
    display:flex;
    justify-content:space-between;
    margin:0 25px;
    font-family: 'Raleway', Courier, monospace;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: ${WHITE};
    ion-icon {   
    :hover, :focus {
            cursor: pointer;
            transition:all 0.2s ease-in;
            --ionicon-stroke-width: 64px;
        }
    }
    
`