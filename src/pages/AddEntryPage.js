import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import FormUser from "../components/FormUser"
import { BASE_URL } from "../constants/url"
import styled from "styled-components"
import { WHITE } from "../constants/colors"
import { useLoading, useToggleLoading } from "../context/LoadingProvider"
import { useToken } from "../context/TokenProvider"

export default function AddEntryPage({type}) {
    const [entryInfo, setEntryInfo] = useState({ value: "", description: "" })
    const entryUrl = type === "income" ? "/nova-entrada" : "/nova-saida"
    const navigate = useNavigate()
    const loading = useLoading()
    const toggleLoading = useToggleLoading()
    const token = useToken()

    function submitFunction() {
        toggleLoading()
        const config = {
            headers: {
                "Authorization": `Bearer ${token.token}`
            }
        }
        axios.post(BASE_URL + entryUrl, entryInfo,config)
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
        <Screen>
            <Title>{type === "income" ? "Nova Entrada" : "Nova Saída" }</Title>
            <FormUser route="/home" submitFunction={submitFunction}>
                <input
                    type="number"
                    placeholder="Valor"
                    value={entryInfo.value}
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
                <Button buttonText={type==="income"? "Salvar Entrada": "Salvar Saída"} />
            </FormUser>
        
        </Screen>
    )
}

const Title = styled.div`
    margin: 0 36px 12px;
    font-family:'Raleway', Courier, monospace ;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: ${WHITE};
`
const Screen = styled.div`
    margin-top: 25px; 
`