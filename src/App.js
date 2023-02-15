import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseScreen from "./components/BaseScreen";
import LoadingProvider from "./context/LoadingProvider";
import TokenProvider from "./context/TokenProvider";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage/HomePage";
import AddEntryPage from "./pages/AddEntryPage";

function App() {
    return (
        <TokenProvider>
            <LoadingProvider>
                <BrowserRouter>
                    <BaseScreen>
                        <Routes>
                            <Route path="/" element={<LoginPage />} />
                            <Route path="/cadastro" element={<SignUpPage />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/nova-entrada" element={<AddEntryPage type="income" />} />
                            <Route path="/nova-saida" element={<AddEntryPage type="expense" />} />
                        </Routes>
                    </BaseScreen>
                </BrowserRouter>
            </LoadingProvider>

        </TokenProvider>

    )
}

export default App