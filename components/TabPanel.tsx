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
        <div
            role="tabpanel"
            className="w-full mx-auto my-12 flex flex-col grow justify-start self-stretch shrink-0 overflow-hidden transition duration-400"
            style={{
                height: `calc(100vh - ${topX}px)`,
                overflowY: value === index ? "auto" : "hidden",
            }}
            ref={outerDivRef}
            {...other}
        >
            <div className="overflow-auto grow">
                <div ref={divRef}>{value === index ? children : null}</div>
            </div>
        </div>
    );
}
