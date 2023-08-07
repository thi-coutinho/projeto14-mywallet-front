import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import PageTransition from "../components/PageTransition";
import styled from "styled-components";
import { WHITE } from "../constants/colors";
import { useEffect, useState, useMemo, useRef } from "react";
import apiEntries from "../services/apiEntries";
import { useToken } from "../context/TokenProvider";
import { LoadingScreen } from "./HomePage/style";
import { ThreeDots } from "react-loader-spinner";
import Title from "../components/Title";
import NavbarFilter from "../components/NavbarFilter";

export default function GraphPage() {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const token = useToken()
    const [dataPoints, setDataPoints] = useState()
    const [filteredPoints, setFilteredPoints] = useState()
    const [detailedCategory, setDetailedCategory] = useState(false)
    const chartRef = useRef()

    useEffect(() => {
        apiEntries.getEntries(token.token)
            .then(res => {
                setDataPoints(res.map(({ category, value, entryType, description, date }) => { return { category, value: Number(value), entryType, description, date } }))
            })
    }, [token])

    let balance;
    let categories = new Set()
    let data = undefined
    let colorList

    const valuesByCategoryList = useMemo(() => {
        if (dataPoints?.length > 0) {
            balance = 0
            if (detailedCategory) {
                filteredPoints?.filter((item) => item.category === detailedCategory && item.entryType === "expense").forEach(e => {
                    balance += Number(e.value)
                    categories.add(e.description)
                })

            } else {
                filteredPoints?.filter((item) => item.entryType === "expense").forEach(e => {
                    balance += Number(e.value)
                    if (e.category) categories.add(e.category)
                })
            }

            categories = [...categories]
            const numCategories = categories.length

            colorList = categories.map((e, i) => `hsl(${(360 / numCategories) * i}, 100%, 74%)`)

            if (!detailedCategory) {
                return filteredPoints?.reduce((acc, { category, value }) => {
                    const key = category
                    const sum = acc[key] ?? 0
                    if (categories.includes(category)) return { ...acc, [key]: sum + value }
                    else return { ...acc }
                }, {})

            } else {
                return filteredPoints?.reduce((acc, { description, value }) => {
                    const key = description
                    const sum = acc[key] ?? 0
                    if (categories.includes(description)) return { ...acc, [key]: sum + value }
                    else return { ...acc }
                }, {})
            }

        }
    }, [filteredPoints, dataPoints, detailedCategory])

    if (valuesByCategoryList) {
        data = {
            labels: categories,
            datasets: [{
                label: '',
                data: Object.values(valuesByCategoryList),
                backgroundColor: colorList,
                hoverOffset: 4
            }]
        };

    }
    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.parsed || '';
                        return 'R$' + label;
                    },
                    title: function ([context]) {
                        let percentage = 100 * Number(context.parsed) / balance
                        return `${context.label}: ${percentage.toFixed(0)} %`
                    }
                },

            },
            legend: {
                position: 'bottom',

            }
        }
    }
    function onClick(evt) {
        const points = chartRef.current.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
        if (points.length) {
            const firstPoint = points[0];
            const label = chartRef.current.data.labels[firstPoint.index];
            if (!detailedCategory) {
                setDetailedCategory(label)
            } else setDetailedCategory(false)

        }
    }
    if (!dataPoints) {
        return (
            <LoadingScreen>
                <ThreeDots color={WHITE} />
            </LoadingScreen>
        )
    }
    const emptyData = !filteredPoints?.length



    return (
        <PageTransition>
            <Title text={"distribuição de gastos"} />
            <NavbarFilter entries={dataPoints} setFilter={setFilteredPoints} destination={'/home'} ionIcon={'home'} />
            <Conteiner>
                {emptyData ?
                    <>Nenhum registro nesse mês</> :
                    <Doughnut data={data} ref={chartRef} onClick={onClick}
                        options={options} />
                }
            </Conteiner>
        </PageTransition>
    )
}

const Conteiner = styled.div`
    background-color:${WHITE};
    border-radius:5px;
    margin:auto 25px;
    padding:10px 10px 0;
    flex: 1 100px auto;
    /* transition: max-heiht 600ms ease-in-out; */

`