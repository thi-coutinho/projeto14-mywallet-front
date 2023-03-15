import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import FormUser from "../components/FormUser"
import { BASE_URL } from "../constants/url"
import styled from "styled-components"
import { WHITE } from "../constants/colors"
import { useLoading, useToggleLoading } from "../context/LoadingProvider"
import { useToken } from "../context/TokenProvider"

export default function AddEntryPage({ type }) {
    const [entryInfo, setEntryInfo] = useState({ value: "", description: "", date: (new Date()).toISOString().slice(0, 10) })
    const entryUrl = type === "income" ? "/nova-entrada" : "/nova-saida"
    const navigate = useNavigate()
    const loading = useLoading()
    const toggleLoading = useToggleLoading()
    const token = useToken()
    const input = useRef("")

    useEffect(() => {
        input.current.focus()
    }, [])

    function reverseDateFormat(str) {
        return str.split("-").reverse().join("/")
    }

    function submitFunction() {
        toggleLoading()
        const config = {
            headers: {
                "Authorization": `Bearer ${token.token}`
            }
        }
        const body = { ...entryInfo, date: reverseDateFormat(entryInfo.date) }
        axios.post(BASE_URL + entryUrl, body, config)
            .then(res => {
                toggleLoading()
                navigate("/home")
            })
            .catch(err => {
                console.log(err)
                alert(err.response.data)
                toggleLoading()
            })
    }

    return (
        <>
            <Title>
                <ion-icon onClick={() => navigate(-1)} name="arrow-back-circle-outline"></ion-icon>
                {type === "income" ? "Nova Entrada" : "Nova Saída"}</Title>
            <FormUser route="/home" submitFunction={submitFunction}>
                <input
                    type="number"
                    placeholder="Valor"
                    value={entryInfo.value}
                    ref={input}
                    onChange={(e) => setEntryInfo({ ...entryInfo, value: Number(e.target.value) })}
                    disabled={loading}
                    required
                />
                <input
                    type="string"
                    placeholder="Descrição"
                    value={entryInfo.description}
                    onChange={(e) => setEntryInfo({ ...entryInfo, description: e.target.value })}
                    disabled={loading}
                    required
                />
                <input
                    type="date"
                    value={entryInfo.date}
                    onChange={(e) => { setEntryInfo({ ...entryInfo, date: e.target.value }) }}
                    disabled={loading}
                    max={(new Date()).toISOString().slice(0, 10)}
                    required
                />
                <Button buttonText={type === "income" ? "Salvar Entrada" : "Salvar Saída"} />
            </FormUser>

        </>
    )
}

const Title = styled.div`
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