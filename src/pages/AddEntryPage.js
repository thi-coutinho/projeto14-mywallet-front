import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import FormUser from "../components/FormUser"
import { BASE_URL } from "../constants/url"
import { useLoading, useToggleLoading } from "../context/LoadingProvider"
import { useToken } from "../context/TokenProvider"
import Title from "../components/Title"
import PageTransition from "../components/PageTransition"
import { useDate } from "../context/DateProvider"
import PopUp from "../components/notification"

export default function AddEntryPage({ type }) {
    const { month, year } = useDate()
    const [entryInfo, setEntryInfo] = useState({ value: "", description: "", date: (new Date(year, Number(month) - 1)).toISOString().slice(0, 10), category: "" })
    const { state: { categories } } = useLocation()
    const entryUrl = type === "income" ? "/nova-entrada" : "/nova-saida"
    const loading = useLoading()
    const toggleLoading = useToggleLoading()
    const token = useToken()
    const input = useRef("")
    const [notify, setNotify] = useState(false)


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
                setNotify(true)
                setTimeout(()=>setNotify(false),1500)
                // navigate("/home")
            })
            .catch(err => {
                console.log(err)
                alert(err.response.data)
                toggleLoading()
            })
        
    }

    return (
        <PageTransition>
            <Title text={type === "income" ? "Nova Entrada" : "Nova Saída"} />
            <PopUp isVisible={notify}>Registro salvo</PopUp>
            <FormUser route="/home" submitFunction={submitFunction}>
                <input
                    type="string"
                    placeholder="Descrição"
                    value={entryInfo.description}
                    ref={input}
                    onChange={(e) => setEntryInfo({ ...entryInfo, description: e.target.value })}
                    disabled={loading}
                    required
                />
                <input
                    type="number"
                    placeholder="Valor"
                    value={entryInfo.value}
                    onChange={(e) => setEntryInfo({ ...entryInfo, value: Number(e.target.value) })}
                    disabled={loading}
                    required
                />
                <input
                    type="text"
                    placeholder="Categoria"
                    value={entryInfo.category}
                    list="categories"
                    onChange={(e) => { setEntryInfo({ ...entryInfo, category: e.target.value }) }}
                    disabled={loading}
                />
                <datalist id="categories">
                    {categories.map((e, i) => <option key={i} value={e}></option>)}
                </datalist>
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

        </PageTransition>
    )
}