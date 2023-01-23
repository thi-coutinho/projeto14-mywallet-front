import axios from "axios"
import { useEffect, useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { BLACK, GREEN, LIGHTGREY, LIGHTPURPLE, RED, WHITE } from "../constants/colors"
import { BASE_URL } from "../constants/url"
import { useSetToken, useToken } from "../context/TokenProvider"

export default function HomePage() {
    const token = useToken()
    const setToken = useSetToken()
    const navigate = useNavigate()
    const [entriesList, setEntriesList] = useState(undefined)
    let balance = undefined;

    if (entriesList?.length > 0) {
        balance = 0
        entriesList.filter((d) => d.entryType === "income").forEach(e => {
            balance += Number(e.value)
        })
        entriesList.filter((d) => d.entryType === "expense").forEach(e => {
            balance -= Number(e.value)
        })
    }

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
    }, [token])
    if (!entriesList) {
        return <ThreeDots color={WHITE} />
    }

    function exit() {
        setToken({})
        navigate("/")
    }
    return (
        <>
            <HelloText>
                <span> Olá, {`${token.name}`}</span>
                <ion-icon onClick={exit} name="exit-outline"></ion-icon>
            </HelloText>
            <EntriesConteiner>
                {entriesList.length === 0 && <p>Não há registros de
                    entrada ou saída</p>}
                <ul>
                    {entriesList.map((e) => (

                        <Entry key={e._id} entryType={e.entryType}>
                            <p><span>{e.date.slice(0, 5)}</span>  {e.description}</p>  <p>{Number(e.value).toFixed(2)}</p>
                        </Entry>
                    )
                    )
                    }
                </ul>
                {balance &&
                    <Balance positive={balance > 0}>
                        <p>Saldo</p>
                        <p>{balance.toFixed(2)}</p>
                    </Balance>}
            </EntriesConteiner>
            <ButtonsConteiner>
                <AddEntryButton onClick={() => navigate("/nova-entrada")}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p>Nova Entrada</p>
                </AddEntryButton>
                <AddEntryButton onClick={() => navigate("/nova-saida")}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova Saída</p>
                </AddEntryButton>
            </ButtonsConteiner>
        </>
    )
}

const HelloText = styled.div`
    display:flex;
    justify-content:space-between;
    margin:0 25px;
    font-family: 'Raleway', Courier, monospace;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: ${WHITE};
`
const EntriesConteiner = styled.div`
    position:relative;
    margin: 25px;
    height: 446px;
    background-color:${WHITE};
    padding: 20px 20px 40px;
    line-height:28px;
    border-radius: 5px;
    ul {
        height:390px;
        overflow-y:auto;
    }
    p {
        color: ${BLACK}
    }
`
const Entry = styled.li`
    display: flex;
    justify-content:space-between;
    p:nth-child(2) {
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

const Balance = styled.div`
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