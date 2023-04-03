import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseScreen from "./components/BaseScreen";
import LoadingProvider from "./context/LoadingProvider";
import TokenProvider from "./context/TokenProvider";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage/HomePage";
import AddEntryPage from "./pages/AddEntryPage";
import UpdatePage from "./pages/UpdatePage/UpdatePage";
import GraphPage from "./pages/GraphPage";
import DateProvider from "./context/DateProvider";

function App() {
    return (
        <TokenProvider>
            <LoadingProvider>
                <DateProvider>
                    <BrowserRouter>
                        <BaseScreen>
                            <Routes>
                                <Route path="/" element={<LoginPage />} />
                                <Route path="/cadastro" element={<SignUpPage />} />
                                <Route path="/home" element={<HomePage />} />
                                <Route path="/nova-entrada" element={<AddEntryPage type="income" />} />
                                <Route path="/nova-saida" element={<AddEntryPage type="expense" />} />
                                <Route path="/home/atualizar/:entryId" element={<UpdatePage />} />
                                <Route path="/graph" element={<GraphPage />} />
                            </Routes>
                        </BaseScreen>
                    </BrowserRouter>
                </DateProvider>
            </LoadingProvider>

        </TokenProvider>

    )
}

export default App