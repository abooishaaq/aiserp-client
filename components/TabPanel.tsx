import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export default function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    const divRef = useRef<HTMLDivElement>(null);
    const outerDivRef = useRef<HTMLDivElement>(null);
    const [topX, setTopX] = useState(0);

    const resizeHandler = () => {
        setTopX(
            outerDivRef.current
                ? outerDivRef.current.getBoundingClientRect().top
                : 0
        );
    };

    useEffect(() => {
        resizeHandler();
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    return (
        <motion.div
            role="tabpanel"
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            className="w-full mx-auto my-0 flex flex-col grow justify-start self-stretch shrink-0 overflow-hidden"
            style={{
                height: `calc(100vh - ${topX}px)`,
                overflowY: value === index ? "auto" : "hidden",
            }}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: value === index ? 1 : 0.4 }}
            transition={{ duration: 0.5 }}
            ref={outerDivRef}
            {...other}
        >
            <div className="overflow-auto grow">
                <div ref={divRef}>{children}</div>
            </div>
        </motion.div>
    );
}
