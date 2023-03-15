import styled from "styled-components"
import { BLACK, GREEN, GREY, LIGHTGREY, LIGHTPURPLE, RED, WHITE } from "../../constants/colors"

export const LoadingScreen = styled.div`
    min-height:80vh;
    display:flex;
    inset:0;
    align-items: center;
    justify-content:center;

`

export const HelloText = styled.div`
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
export const EntriesConteiner = styled.div`
    display:flex;
    flex-direction:column;
    position:relative;
    margin: 25px;
    flex:1;
    background-color:${WHITE};
    padding: 10px 20px;
    line-height:28px;
    border-radius: 5px;
    ul {
        flex:1;
        overflow-y:auto;
    }
    p {
        color: ${BLACK}
    }
`
export const Entry = styled.li`
    
	animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation-delay: ${props => props.delay / 30 + 's'};
    transition: all 0.5s ease-out;
    display: flex;
    justify-content:space-between;
    p:nth-child(2) {
        color: ${props => props.entryType === "income" ? `${GREEN}` : `${RED}`}
    }
    span {
        color: ${LIGHTGREY}
    }
    ion-icon {
        
        margin:0 4px;
        color:${GREY};
        :hover {
            cursor: pointer;
        }
        
    }
    :has(ion-icon[data-show='false'])  {
            animation: slide-out-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
        }
`
export const AddEntryButton = styled.button`
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 21px;
    p {
        font-size: 20px;
    }
    line-height: 20px;
    color: ${WHITE};
    width:45%;
    height: 100px;
    padding:12px;
    border-radius: 5px;
    border:none;
    background-color: ${LIGHTPURPLE};
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:15px;
    align-items:center;
    transition: filter 300ms;
    ion-icon{
        font-size:32px;
    }
    :hover, :focus{
        filter:brightness(1.1);
        cursor: pointer;
        ion-icon, p {
            transition:color 0.2s ease-in;
            color:${props => props.fill};
            --ionicon-stroke-width: 64px;
        }
    }
    
    :focus{
        animation: jello-horizontal 0.9s both;
    }
    
`

export const ButtonsConteiner = styled.div`
    margin: 11px 25px;
    display: flex;
    justify-content:space-between;
`

export const Balance = styled.div`
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    position:sticky;
    display:flex;
    justify-content:space-between;
    background-color:${WHITE};
    bottom:0px;
    height:30px;
    p:nth-child(2) {
        color: ${props => props.positive ? `${GREEN}` : `${RED}`}
    }
`