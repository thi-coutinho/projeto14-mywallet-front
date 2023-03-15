import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { WHITE } from "../constants/colors";


export default function Title({ text }) {
    const navigate = useNavigate()
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