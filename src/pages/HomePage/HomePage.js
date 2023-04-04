import { useEffect, useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"
import NavbarFilter from "../../components/NavbarFilter.js"
import PageTransition from "../../components/PageTransition"
import Title from "../../components/Title"
import { LIGHTGREEN, LIGHTRED, WHITE } from "../../constants/colors"
import { useToken } from "../../context/TokenProvider"
import apiEntries from "../../services/apiEntries"
import { AddEntryButton, Balance, BalanceTop, ButtonsConteiner, EntriesConteiner, Entry, Linha, LoadingScreen } from "./style"
import { useDate } from "../../context/DateProvider.js"

export default function HomePage() {
    const token = useToken()
    const navigate = useNavigate()
    const { month, year } = useDate()
    const [entriesList, setEntriesList] = useState(undefined)
    const [filteredProducts, setFilteredProducts] = useState(undefined)
    const [deleteEntry, setDeleteEntry] = useState(false)

    let balance = undefined;
    let categories = new Set()

    useEffect(() => {
        apiEntries.getEntries(token.token)
            .then(res => {
                // console.log(res[0].date.slice(3,5))
                setEntriesList(res)
            })
    }, [token, deleteEntry])

    if (entriesList?.length > 0) {
        balance = 0
        entriesList.filter((d) => d.entryType === "income").forEach(e => {
            balance += Number(e.value)
            if (e.category) categories.add(e.category)
        })
        entriesList.filter((d) => d.entryType === "expense").forEach(e => {
            balance -= Number(e.value)
            if (e.category) categories.add(e.category)
        })
        categories = [...categories]
    }




    async function delEntry(e, id) {
        e.target.dataset.show = false
        await apiEntries.delEntry(id, token.token)
        setTimeout(() => setDeleteEntry(!deleteEntry), 500)
    }


    if (!entriesList) {
        return (
            <LoadingScreen>
                <ThreeDots color={WHITE} />
            </LoadingScreen>
        )
    }

    const subtotal = entriesList.reduce((acc, { entryType, value, date }) => {
        const currentValue = entryType === "expense" ? value * (-1) : value
        // console.log()
        const itemMonth = Number(date.slice(3, 5))
        const itemYear = Number(date.slice(6, 10))
        if (itemYear < Number(year) || (itemMonth < Number(month) && itemYear === Number(year))) {
            // console.log("ambos",currentValue,entryType,date, Number(date.slice(3,5)),Number(date.slice(6,10)))
            return {
                saldoAnterior: acc.saldoAnterior + currentValue,
                saldoFinal: acc.saldoFinal + currentValue
            }
        } else if (itemMonth === Number(month) && itemYear === Number(year)) {
            // console.log("final",currentValue,entryType,date, Number(date.slice(3,5)),Number(date.slice(6,10)))
            return { ...acc, saldoFinal: acc.saldoFinal + currentValue }
        } else {
            // console.log("nenhum",currentValue,entryType,date, Number(date.slice(3,5)),Number(date.slice(6,10)))
            return { ...acc }
        }


    }, { saldoAnterior: 0, saldoFinal: 0 })
    return (
        <PageTransition>
            <Title />
            <NavbarFilter entries={entriesList} setFilter={setFilteredProducts} destination={'/graph'} ionIcon={'pie-chart'} />
            <EntriesConteiner>
                <BalanceTop positive={subtotal.saldoFinal >= 0}>
                    <p>Saldo Final</p>
                    <p>{Intl.NumberFormat("pt-BR", { style: 'currency', currency: "BRL" }).format(subtotal.saldoFinal.toFixed(2))}</p>
                </BalanceTop>
                <Linha/>
                {filteredProducts?.length === 0 && <p>Não há registros de
                    entrada ou saída</p>}
                <ul>
                    {filteredProducts?.map((e, i) => (

                        <Entry key={e._id} entryType={e.entryType} delay={i}>
                            <p><span>{e.date.slice(0, 2)}</span>  {e.description}</p>
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
                                                category: e.category,
                                                value: e.value,
                                                entryType: e.entryType,
                                                categories: categories
                                            }
                                        })}
                                ></ion-icon>

                            </p>
                        </Entry>
                    )
                    )
                    }
                </ul>

                    <Linha />
                <Balance positive={subtotal.saldoAnterior >= 0}>
                    <p>Saldo anterior</p>
                    <p>{Intl.NumberFormat("pt-BR", { style: 'currency', currency: "BRL" }).format(subtotal.saldoAnterior.toFixed(2))}</p>
                </Balance>
            </EntriesConteiner>
            <ButtonsConteiner>
                <AddEntryButton fill={LIGHTGREEN} onClick={() => setTimeout(() => navigate("/nova-entrada",
                    { state: { categories: categories } }), 900)}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p>Nova Entrada</p>
                </AddEntryButton>
                <AddEntryButton fill={LIGHTRED} onClick={() => setTimeout(() => navigate("/nova-saida",
                    { state: { categories: categories } }), 900)}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova Saída</p>
                </AddEntryButton>
            </ButtonsConteiner>
        </PageTransition>
    )
}
