import TabPanel from "./TabPanel";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ITabsContainerProps {
    tabNames: string[];
    tabPanels: JSX.Element[];
}

const TabsContainer = ({ tabNames, tabPanels }: ITabsContainerProps) => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (value: number) => {
        setTabValue(value);
        window.location.hash = `#${value}`;
    };

    // read the tab value from the url
    useEffect(() => {
        const tabValueFromUrl =
            parseInt(window.location.hash.replace("#", "")) || 0;
        // is in range
        if (tabValueFromUrl >= 0 && tabValueFromUrl < tabNames.length) {
            setTabValue(tabValueFromUrl);
        }
    }, [tabNames.length]);

    return (
        <>
            <div className="text-sm font-medium text-center text-blue border-b border-blue">
                <ul className="flex flex-wrap -mb-px">
                    {tabNames.map((name, index) => (
                        <li
                            className="mr-2"
                            key={index}
                            onClick={() => handleTabChange(index)}
                        >
                            <motion.a
                                href={`#${index}`}
                                className="inline-block uppercase p-4 rounded-t-lg border-b-2 border-transparent hover:blue-900 hover:border-blue-300 active:bg-blue-800 transition duration-150 ease-in-out"
                            >
                                {name}
                            </motion.a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex lfex-col overflow-hidden">
            <motion.div
                transition={{
                    tension: 50,
                    mass: 0.4,
                }}
                animate={{ x: tabValue * -100 + "%" }}
                className="flex grow w-full will-change-transform"
            >
                {tabPanels.map((panel, index) => (
                    <TabPanel value={tabValue} index={index} key={index}>
                        {panel}
                    </TabPanel>
                ))}
            </motion.div></div>
        </>
    );
};

export default TabsContainer;
