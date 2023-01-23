import axios from "axios"
import { useEffect, useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { GREEN, GREY, LIGHTGREY, LIGHTPURPLE, RED, WHITE } from "../constants/colors"
import { BASE_URL } from "../constants/url"
// import { useLoading } from "../context/LoadingProvider"
import { useToken } from "../context/TokenProvider"

export default function HomePage() {
    const token = useToken()
    const navigate = useNavigate()
    const [entriesList, setEntriesList] = useState(undefined)
    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token.token}`
            }
        }
        axios.get(BASE_URL + "/home", config)
            .then(res => {
                setEntriesList(res.data)
            })
            .catch(err => console.log(err.response.data))
    },[token])
    if (!entriesList) {
        return <ThreeDots color={WHITE} />
    }
    return (
        <>
            <HelloText>Olá, {`${token.name}`}</HelloText>
            <EntriesConteiner>
                {entriesList.length === 0 && <p>Não há registros de
                    entrada ou saída</p>}
                {entriesList.map((e) => (

                    <Entry key={e._id} entryType={e.entryType}>
                        <span>{e.date.slice(0, 5)}</span>  {e.description}  <p>{Number(e.value).toFixed(2)}</p>
                    </Entry>
                )
                )}
            </EntriesConteiner>
            <ButtonsConteiner>
                <AddEntryButton onClick={()=>navigate("/nova-entrada")}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p>Nova Entrada</p>
                </AddEntryButton>
                <AddEntryButton onClick={()=>navigate("/nova-saida")}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova Saída</p>
                </AddEntryButton>
            </ButtonsConteiner>
        </>
    )
}

const HelloText = styled.div`
    margin:0 25px;
    font-family: 'Raleway', Courier, monospace;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: ${WHITE};
`
const EntriesConteiner = styled.div`
    margin: 25px;
    height: 446px;
    background-color:${WHITE};
    padding: 10px;
    line-height:28px;
    border-radius: 5px;
    overflow-y:auto;
    p {
        color: ${GREY}
    }
`
const Entry = styled.div`
    display: flex;
    justify-content:space-between;
    p {
        color: ${props => props.entryType === "income" ? `${GREEN}` : `${RED}`}
    }
    span {
        color: ${LIGHTGREY}
    }
`
const AddEntryButton = styled.button`
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 21px;
    p {
        font-size: 17px;
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
    justify-content:space-between;
`

const ButtonsConteiner = styled.div`
    margin: 11px 25px;
    display: flex;
    justify-content:space-between;
`