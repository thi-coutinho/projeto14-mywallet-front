import styled from "styled-components"
import { Link } from "react-router-dom"
import { BLACK, WHITE } from "../constants/colors"


export default function FormUser({ route, linkText, submitFunction, children }) {

    return (
        <FlexRow>
            <FormLogin onSubmit={(e) => {
                e.preventDefault()
                submitFunction()
            }}>
                {children}
            </FormLogin>
            <Link to={route}>{linkText}</Link>
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
    width:calc(100vw - 2 * 36px);
    flex-direction:column;
    justify-content:center;
    align-items:center;
    font-family:'Raleway', sans-serif;
    input {
        border-radius: 5px;
        font-size:inherit;
        width:inherit;
        height:45px;
        padding-left:11px;
        margin:3px 36px;
        &::placeholder{
            color: ${BLACK};
        }
    }
`