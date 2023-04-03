import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import FormUser from "../components/FormUser"
import { BASE_URL } from "../constants/url"
import { useSetToken, useToken } from "../context/TokenProvider"
import styled from "styled-components"
import { WHITE } from "../constants/colors"
import { useLoading, useToggleLoading } from "../context/LoadingProvider"
import PageTransition from "../components/PageTransition"

export default function LoginPage() {
    const linkText = "Primeira vez? Cadastre-se!"
    const [bodyLoginInfo, setBodyLoginInfo] = useState({ email: "", password: "" })
    const setToken = useSetToken()
    const token = useToken()
    const navigate = useNavigate()
    const loading = useLoading()
    const toggleLoading = useToggleLoading()

    useEffect(()=>{
        if (token.token) navigate("/home")
    },[])

    function submitFunction() {
        toggleLoading()
        axios.post(BASE_URL + "/", bodyLoginInfo)
            .then(res => {
                const token = { token: res.data.token, name:res.data.userName}
                setToken(token)
                localStorage.setItem("token",token.token)
                localStorage.setItem("name",token.name)
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
        <PageTransition>
            <Title>MyWallet</Title>
            <FormUser route="/cadastro" submitFunction={submitFunction} linkText={linkText}>
                <input
                    type="email"
                    placeholder="E-mail"
                    value={bodyLoginInfo.email}
                    onChange={(e) => setBodyLoginInfo({ ...bodyLoginInfo, email: e.target.value })}
                    disabled={loading}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={bodyLoginInfo.password}
                    onChange={(e) => setBodyLoginInfo({ ...bodyLoginInfo, password: e.target.value })}
                    disabled={loading}
                    required
                />
                <Button buttonText="Entrar" />
            </FormUser>
        
        </PageTransition>
    )
}

const Title = styled.div`
    font-family:'Saira Stencil One', Courier, monospace ;
    display:flex;
    margin-top: 128px; 
    justify-content:center;
    font-size: 32px;
    line-height: 50px;
    color: ${WHITE};
`