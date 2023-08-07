import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { LIGHTGREEN, LIGHTPURPLE, WHITE } from "../constants/colors"
import { useDate, useSetDate } from "../context/DateProvider"

export default function NavbarFilter({ entries, setFilter, ionIcon, destination }) {
    const navigate = useNavigate()
    const { month, year } = useDate()
    const setDate = useSetDate()
    const CurrentYear = (new Date()).toISOString().slice(0, 4)
    const inputMonthFilter = useRef("")
    const [showDropDown, setShowDropDown] = useState(false)


    useEffect(() => {
        setFilter(entries?.filter(item => item.date.slice(3, 10) === month + '/' + year))
    }, [month, year, entries, setFilter])

    const arrayRange = (start, stop, step) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => (start + index * step).toString()
        );

    let yearList = arrayRange(Number(CurrentYear), Number(CurrentYear) - 30, -1)


    function filterMonth() {
        inputMonthFilter.current.showPicker()
    }

    return (
        <Conteiner>
            <div>
                <ion-icon onClick={() => filterMonth()} name="calendar-outline"></ion-icon>
                <input type="month" ref={inputMonthFilter} max={(new Date()).toISOString().slice(0, 7)} value={`${year}-${month}`} onChange={(e) => {
                    setDate({ month: e.target.value.slice(5), year: e.target.value.slice(0, 4) })
                }} />

                <p onClick={() => filterMonth()}>{(new Date(year, month - 1, 1).toLocaleDateString('pt-BR', { month: 'long' }))}</p>
                <DropDownInput showDropDown={showDropDown} onClick={() => setShowDropDown(e => !e)}>
                    <p>{year}</p>
                    <ul>
                        {yearList.map((e) =>
                            <li key={e}
                                onClick={() => {
                                    setDate({ month: month, year: Math.min(CurrentYear, e) })
                                }}
                            >{e}</li>)}
                    </ul>

                </DropDownInput>

            </div>
            <ion-icon onClick={() => navigate(`${destination}`)} name={ionIcon}></ion-icon>

        </Conteiner>
    )
}

const DropDownInput = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    width:fit-content;
    margin-right:5px;
    height:31px;
    color:white;
    font-family: 'Raleway';
    text-align:center;
    padding:none;
    font-weight: 700;
    font-size: 16px;
    border-radius:5px;
    user-select: none;
    border:none;
    box-shadow:none;
    background-color: ${LIGHTPURPLE};
    p {
        display:${props => props.showDropDown ? 'none' : 'block'};
    }
    > ul {
        z-index:3;
        position:absolute;
        top:0;
        left:0;
        width:fit-content;
        height:93px;
        border-radius: 5px;
        padding: 0 10px; 
        overflow-y:scroll;
        scroll-behavior: smooth;
        scroll-snap-type: y mandatory;
        
        ::-webkit-scrollbar {
            width:5px;
        }
        ::-webkit-scrollbar-thumb {
            background: white; 
            border-radius: 10px;
        }
        flex-direction:column;
        background-color: ${LIGHTPURPLE};
        display:${props => props.showDropDown ? 'flex' : 'none'};
        li {
            display:${props => props.showDropDown ? 'flex' : 'none'};
            scroll-snap-stop: always;
            &:hover{
                cursor:pointer;
                filter: drop-shadow(-2px -2px 6px white)
            }
        }
    }
`

const Conteiner = styled.div`
    display:flex;
    justify-content:space-between;
    margin:15px 25px 0;
    font-family: 'Raleway', Courier, monospace;
    font-weight: 700;
    visibility:visible;
    font-size: 26px;
    line-height: 31px;
    width:auto;
    color: ${WHITE};
    div {
        gap:5px;
        display:flex;
        justify-content:space-evenly;
        align-self:center;
        overflow:visible;
    }
    ion-icon {   
        margin:0 5px;
    :hover, :focus {
            cursor: pointer;
            transition:all 0.2s ease-in;
            --ionicon-stroke-width: 64px;
            &:nth-child(2){
                fill:${LIGHTGREEN};
            }
        }
    }
    input[type=month] {        
        visibility: hidden;
        width:0;
    }
    p {       
        padding: 0 10px; 
        color:white;
        font-family: 'Raleway';
        width:fit-content;
        text-align:center;
        padding:none;
        font-weight: 700;
        font-size: 16px;
        border-radius:5px;
        border:none;
        box-shadow:none;
        background-color: ${LIGHTPURPLE};
        transition:all 0.2s;
        &:hover{
            cursor: pointer;
            filter: drop-shadow(-2px -2px 6px white)
        }
    }

    
`