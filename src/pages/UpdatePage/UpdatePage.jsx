import axios from "axios"
import { useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import Button from "../../components/Button"
import FormUser from "../../components/FormUser"
import PageTransition from "../../components/PageTransition"
import  Title  from "../../components/Title"
import { BASE_URL } from "../../constants/url"
import { useLoading, useToggleLoading } from "../../context/LoadingProvider"
import { useToken } from "../../context/TokenProvider"
import { RadioContainers, RadioInput } from "./style"
import PopUp from "../../components/notification"

export default function UpdatePage() {
    const { state: { date, description, category ,value, categories, entryType } } = useLocation()
    const dateFormated = date.split("/").reverse().join("-")
    const [entryInfo, setEntryInfo] = useState({ value, description, date, category , dateFormated, entryType })
    const loading = useLoading()
    const toggleLoading = useToggleLoading()
    const token = useToken()
    const { entryId } = useParams()
    const [notify,setNotify] = useState(false)

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

        const { value, description, date, category, entryType } = entryInfo
        axios.put(BASE_URL + `/update/${entryId}`, { value, description, date, category ,entryType }, config)
            .then(res => {
                toggleLoading()
                setNotify(true)
                setTimeout(()=>setNotify(false),2500)
            })
            .catch(err => {
                console.log(err)
                toggleLoading()
            })

    }

    return (
        <PageTransition>
            <Title text={'Atualizar entrada/saída'}/>
            <PopUp isVisible={notify}>Atualizado</PopUp>
            <FormUser route="/home" submitFunction={submitFunction}>
                <input
                    type="number"
                    placeholder="Valor"
                    value={+Number(entryInfo.value)}
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
                    type="string"
                    placeholder="Categoria"
                    value={entryInfo.category}
                    onChange={(e) => setEntryInfo({ ...entryInfo, category: e.target.value })}
                    list="categories"
                    disabled={loading}
                    required
                />
                <datalist id="categories">
                    {categories.map((e,i)=> <option key={i} value={e}></option>)}
                </datalist>
                <input
                    type="date"
                    placeholder={entryInfo.dateFormated}
                    value={entryInfo.dateFormated}
                    onChange={(e) => { setEntryInfo({ ...entryInfo, dateFormated: e.target.value, date: reverseDateFormat(e.target.value) }) }}
                    disabled={loading}
                    required
                />
                <RadioContainers>
                    <label>
                        <RadioInput
                            type="radio"
                            id="income"
                            value="income"
                            checked={entryInfo.entryType === "income"}
                            onChange={(e) => { setEntryInfo({ ...entryInfo, entryType: e.target.value }) }}
                            disabled={loading}
                            required
                        />
                        <div>
                            <span id="income">Entrada</span>
                        </div>
                    </label>
                    <label>
                        <RadioInput
                            type="radio"
                            id="expense"
                            value="expense"
                            checked={entryInfo.entryType === "expense"}
                            onChange={(e) => { setEntryInfo({ ...entryInfo, entryType: e.target.value }) }}
                            disabled={loading}
                            required
                        />
                        <div>
                            <span id="expense">Saída</span>
                        </div>
                    </label>
                </RadioContainers>
                <Button buttonText={"Atualizar"} />
            </FormUser>

        </PageTransition>
    )
}
