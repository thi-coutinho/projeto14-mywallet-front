import styled from "styled-components"
import { LIGHTPURPLE } from "../../constants/colors"

export const RadioInput = styled.input.attrs({ type: "radio" })`
    
    display: none;
    &:checked {
    + div {
        background-color: ${props => props.id === 'income' ? '#16ad50' : '#e25656'} ;
        span {
        color: white;
        transform: translateY(20px);
        &:before {
            transform: translateY(0px);
            opacity: 1;
        }
        }
    }
    }
    
`
export const RadioContainers = styled.div`
    width: 100%;
    text-align: center;
    display:flex;
    justify-content:space-around;
    div {
        width: 150px;
        height: 100px;
        margin:10px;
        border-radius:5px;
        background-color: ${LIGHTPURPLE};
        transition: all 250ms ease;
        will-change: transition;
        display: inline-block;
        text-align: center;
        cursor: pointer;
        position: relative;
        font-weight: 900;
        &:active {
        transform: translateY(10px);
        }
        span {
        position: absolute;
        transform: translate(0, 10px);
        left: 0;
        right: 0;
        
        transition: all 300ms ease;
        font-size: 1.2em;
        user-select: none;
        color: white;
        &#income::before{
                content:'$';
            }
        &#expense::before{
                content:'$';
            }
        &::before {
            font-size: 0.8em;
            display: block;
            margin-bottom:5px;
            transform: translateY(-5px);
            opacity: 0;
            transition: all 300ms ease-in-out;
            font-weight: normal;
            color: white;
        }
        }
    }   
`