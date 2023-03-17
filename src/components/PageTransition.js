import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }) {
    const location = useLocation()

    return <motion.div location={location} key={location.pathname}
        initial={{ opacity: 0 }}
        // initial={{ opacity: 0 ,x: 300}}
        animate={{ opacity: 1 }}
        // animate={{ opacity: 1 ,x:0}}
        exit={{ opacity: 0 }}
        // exit={{ opacity: 0 ,x:-300}}
        transition={{
            type: "Inertia",
            // stiffness: 200
        }}

    >
        {children}
    </motion.div>

}