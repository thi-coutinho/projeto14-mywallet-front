import { useEffect, useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"
import { LIGHTGREEN, LIGHTRED, WHITE } from "../../constants/colors"
import { useSetToken, useToken } from "../../context/TokenProvider"
import apiEntries from "../../services/apiEntries"
import { AddEntryButton, Balance, ButtonsConteiner, EntriesConteiner, Entry, HelloText, LoadingScreen } from "./style"

export default function HomePage() {
    const token = useToken()
    const setToken = useSetToken()
    const navigate = useNavigate()
    const [entriesList, setEntriesList] = useState(undefined)
    const [deleteEntry, setDeleteEntry] = useState(false)
    let balance = undefined;

    useEffect(() => {
        apiEntries.getEntries(token.token)
        .then(res => setEntriesList(res))
    }, [token, deleteEntry])

    if (entriesList?.length > 0) {
        balance = 0
        entriesList.filter((d) => d.entryType === "income").forEach(e => {
            balance += Number(e.value)
        })
        entriesList.filter((d) => d.entryType === "expense").forEach(e => {
            balance -= Number(e.value)
        })
    }

    if (!entriesList) {
        return (
            <LoadingScreen>
                <ThreeDots color={WHITE} />
            </LoadingScreen>
        )
    }

    function exit() {
        Object.keys(token).forEach(el => localStorage.removeItem(el))
        setToken({})
        navigate("/")
    }

    async function delEntry(e, id) {
        e.target.dataset.show = false
        await apiEntries.delEntry(id,token.token)
        setTimeout(() => setDeleteEntry(!deleteEntry), 500)
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
                    {entriesList.map((e, i) => (

                        <Entry key={e._id} entryType={e.entryType} delay={i}>
                            <p><span>{e.date.slice(0, 10)}</span>  {e.description}</p>
                            <p>
                                {Intl.NumberFormat("pt-BR", {
                                    minimumIntegerDigits: 2,
                                    minimumFractionDigits: 2,
                                }).format(Number(e.value))}

                                <ion-icon onClick={(evento) => delEntry(evento, e._id)} data-show={true} name="close-circle-outline"></ion-icon>
                                <ion-icon
                                    name="create-outline"
                                    onClick={() => navigate(`atualizar/${e._id}`,
                                        {
                                            state: {
                                                date: e.date,
                                                description: e.description,
                                                value: e.value,
                                                entryType: e.entryType
                                            }
                                        })}
                                ></ion-icon>

                            </p>
                        </Entry>
                    )
                    )
                    }
                </ul>
                {balance &&
                    <Balance positive={balance > 0}>
                        <p>Saldo</p>
                        <p>{Intl.NumberFormat("pt-BR", { style: 'currency', currency: "BRL" }).format(balance.toFixed(2))}</p>
                    </Balance>}
            </EntriesConteiner>
            <ButtonsConteiner>
                <AddEntryButton fill={LIGHTGREEN} onClick={() => setTimeout(() => navigate("/nova-entrada"), 900)}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p>Nova Entrada</p>
                </AddEntryButton>
                <AddEntryButton fill={LIGHTRED} onClick={() => setTimeout(() => navigate("/nova-saida"), 900)}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova Saída</p>
                </AddEntryButton>
            </ButtonsConteiner>
        </>
    )
}
