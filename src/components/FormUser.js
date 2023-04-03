import styled from "styled-components"
import { Link } from "react-router-dom"
import { BLACK, LIGHTPURPLE, PURPLE, WHITE } from "../constants/colors"


export default function FormUser({ route, linkText, submitFunction, children }) {

    return (
        <FlexRow>
            <FormLogin onSubmit={(e) => {
                e.preventDefault()
                submitFunction()
            }}>
                {children}
            </FormLogin>
            {linkText && <Link to={route}>{linkText}</Link> }
        </FlexRow>
    )

}

const FlexRow = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    a {
        font-family:'Raleway', Courier, monospace;
        font-weight:700;
        color:${WHITE}
    }
`
const FormLogin = styled.form`
    display:flex;
    font-size:20px;
    max-width:100%;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    font-family:'Raleway', sans-serif;
    input {
        border-radius: 12px;
        border:none;
        font-size:inherit;
        height:45px;
        padding: 0 11px;
        margin:3px 0;
        &::placeholder{
            color: ${BLACK};
        }
        &:focus {
            outline-color:${LIGHTPURPLE};
            outline-style: inset;
            outline-offset: -4px;
            outline-width: 3px;
        }
    }
`