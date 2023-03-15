import styled from "styled-components"
import { LIGHTPURPLE, WHITE } from "../../constants/colors"


export const Title = styled.div`
    margin: 0 36px 12px;
    font-family:'Raleway', Courier, monospace ;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: ${WHITE};
`

export const RadioInput = styled.input.attrs({ type: "radio" })`
    
    display: none;
    &:checked {
    + div {
        background-color: ${props => props.id === 'income'? '#16ad50' : '#e25656' } ;
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
        font-size: 1.5em;
        user-select: none;
        color: white;
        &::before {
            content:'$';
            font-size: 1.2em;
            display: block;
            transform: translateY(-5px);
            opacity: 0;
            transition: all 300ms ease-in-out;
            font-weight: normal;
            color: white;
        }
        }
    }   
`