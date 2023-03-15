import axios from "axios"
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Button from "../../components/Button"
import FormUser from "../../components/FormUser"
import  Title  from "../../components/Title"
import { BASE_URL } from "../../constants/url"
import { useLoading, useToggleLoading } from "../../context/LoadingProvider"
import { useToken } from "../../context/TokenProvider"
import { RadioContainers, RadioInput } from "./style"

export default function UpdatePage() {
    const { state: { date, description, value, entryType } } = useLocation()
    const dateFormated = date.split("/").reverse().join("-")
    const [entryInfo, setEntryInfo] = useState({ value, description, date, dateFormated, entryType })
    const navigate = useNavigate()
    const loading = useLoading()
    const toggleLoading = useToggleLoading()
    const token = useToken()
    const { entryId } = useParams()

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

        const { value, description, date, entryType } = entryInfo
        axios.put(BASE_URL + `/update/${entryId}`, { value, description, date, entryType }, config)
            .then(res => {
                toggleLoading()
                navigate("/home")
            })
            .catch(err => {
                console.log(err)
                toggleLoading()
            })
    }

    return (
        <>
            <Title text={'Atualizar entrada/saída'}/>
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

        </>
    )
}
