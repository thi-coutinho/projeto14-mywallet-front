import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }) {
    const location = useLocation()

    return <motion.div location={location} key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
            type: "Inertia",
        }}

    >
        {children}
    </motion.div>

}