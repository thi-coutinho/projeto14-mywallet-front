import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseScreen from "./components/BaseScreen";
import LoadingProvider from "./context/LoadingProvider";
import TokenProvider from "./context/TokenProvider";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";

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
                            {/* <Route path="/nova-entrada" element={<AddIncomePage />} /> */}
                            {/* <Route path="/nova-saida" element={<AddExpensePage />} /> */}
                        </Routes>
                    </BaseScreen>
                </BrowserRouter>
            </LoadingProvider>

        </TokenProvider>

    )
}

export default App