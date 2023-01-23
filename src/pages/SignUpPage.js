import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import FormUser from "../components/FormUser"
import { BASE_URL } from "../constants/url"
import styled from "styled-components"
import { WHITE } from "../constants/colors"
import { useLoading, useToggleLoading } from "../context/LoadingProvider"

export default function SignUpPage() {
    const linkText = "Já tem uma conta? Entre agora!"
    const [bodySignupInfo, setBodySignupInfo] = useState({ email: "", password: "", name: "",confirmPassword:"" })
    const navigate = useNavigate()
    const loading = useLoading()
    const toggleLoading = useToggleLoading()

    function submitFunction() {
        toggleLoading()
        axios.post(BASE_URL + "/cadastro", bodySignupInfo)
            .then(res => {
                toggleLoading()
                navigate("/")
            })
            .catch(err => {
                console.log(err)
                alert(err.response.data)
                toggleLoading()
            })
    }

    return (
        <Screen>
            <Title>MyWallet</Title>
            <FormUser route="/" submitFunction={submitFunction} linkText={linkText}>
                <input
                    type="text"
                    value={bodySignupInfo.name}
                    onChange={(e => setBodySignupInfo({ ...bodySignupInfo, name: e.target.value }))}
                    placeholder="Nome" required disabled={loading} />
                <input
                    type="email"
                    placeholder="E-mail"
                    value={bodySignupInfo.email}
                    onChange={(e) => setBodySignupInfo({ ...bodySignupInfo, email: e.target.value })}
                    disabled={loading}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={bodySignupInfo.password}
                    onChange={(e) => setBodySignupInfo({ ...bodySignupInfo, password: e.target.value })}
                    disabled={loading}
                    required
                />
                 <input
                    type="password"
                    placeholder="Confirme a senha"
                    value={bodySignupInfo.confirmPassword}
                    onChange={(e) => setBodySignupInfo({ ...bodySignupInfo, confirmPassword: e.target.value })}
                    disabled={loading}
                    required
                />
                <Button buttonText="Cadastro" />
            </FormUser>

        </Screen>
    )
}

const Title = styled.div`
    font-family:'Saira Stencil One', Courier, monospace ;
    display:flex;
    justify-content:center;
    font-size: 32px;
    line-height: 50px;
    color: ${WHITE};
`
const Screen = styled.div`
    margin-top: 95px; 
`