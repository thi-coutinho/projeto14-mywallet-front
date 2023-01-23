import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseScreen from "./components/BaseScreen";
import TokenProvider from "./context/TokenProvider";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";


function App() {
    return (
        <TokenProvider>
            <BrowserRouter>
                <BaseScreen>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/cadastro" element={<SignUpPage />} />
                        {/* <Route path="/home" element={<HomePage />} /> */}
                        {/* <Route path="/nova-entrada" element={<AddIncomePage />} /> */}
                        {/* <Route path="/nova-saida" element={<AddExpensePage />} /> */}
                    </Routes>
                </BaseScreen>

            </BrowserRouter>

        </TokenProvider>

    )
}

export default App