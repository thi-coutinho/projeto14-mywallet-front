import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import { EXTRALIGHTPURPLE, LIGHTPURPLE, WHITE } from "../constants/colors";
import { useLoading } from "../context/LoadingProvider";

export default function Button({ buttonText, submitFuntion}) {
    const loading = useLoading()
    function handleClick(e) {
        if (submitFuntion) {
            e.preventDefault()
            submitFuntion()
        }
    }

    return (
        <ButtonStyled onClick={e => handleClick(e)} disabled={loading} type="submit">{
            loading ? <ThreeDots color="white" /> : buttonText}
        </ButtonStyled>
    )
}

const ButtonStyled = styled.button`
    margin:3px 36px 25px;
    font-family:'Raleway', Courier, monospace;
    font-weight:700;
    font-size: 20px;
    line-height: 26px;
    width: 100%;
    height: 45px;
    color: ${WHITE};
    background: ${props => props.disabled ? `${EXTRALIGHTPURPLE}` : `${LIGHTPURPLE}`};
    border-radius: 5px;
    border: ${LIGHTPURPLE};
    padding:0;

    div {
        height:100%;
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        svg {
            height:26px;
            width:60px;
        }
    }
`