import Box from "@mui/material/Box";
import { motion } from "framer-motion";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export default function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <motion.div
            role="tabpanel"
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            className="w-full mx-auto my-0 flex flex-col justify-start self-stretch shrink-0 "
            initial={{ opacity: 0.8 }}
            animate={{ opacity: value === index ? 1 : 0.8 }}
            transition={{ duration: 1 }}
            {...other}
        >
            <div>{children}</div>
        </motion.div>
    );
}
