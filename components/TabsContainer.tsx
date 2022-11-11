import TabPanel from "./TabPanel";
import { useEffect, useState } from "react";

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

    const handleTabChangeGen = (value: number) => () => handleTabChange(value);

    // read the tab value from the url
    useEffect(() => {
        const tabValueFromUrl =
            parseInt(window.location.hash.replace("#", "")) || 0;
        // is in range
        if (tabValueFromUrl >= 0 && tabValueFromUrl < tabNames.length) {
            setTabValue(tabValueFromUrl);
        }

        window.onhashchange = () => {
            const tabValueFromUrl =
                parseInt(window.location.hash.replace("#", "")) || 0;
            // is in range
            if (tabValueFromUrl >= 0 && tabValueFromUrl < tabNames.length) {
                setTabValue(tabValueFromUrl);
            }
        };

        return () => {
            window.onhashchange = null;
        };
    }, [tabNames.length]);

    return (
        <>
            <div className="text-sm font-medium text-center text-blue border-b-4 border-blue">
                <ul className="flex -mb-px overflow-x-auto no-scroll">
                    {tabNames.map((name, index) => (
                        <li
                            className="mr-2"
                            key={index}
                            onClick={handleTabChangeGen(index)}
                        >
                            <a
                                href={`#${index}`}
                                className="inline-block shadow-lg whitespace-nowrap uppercase p-4 rounded-t-lg border-b-2 border-transparent hover:bg-burlywood hover:text-blue transition-colors duration-200"
                                style={{
                                    backgroundColor:
                                        index === tabValue ? "var(--blue)" : "",
                                    color:
                                        index === tabValue
                                            ? "var(--beige)"
                                            : "",
                                }}
                            >
                                {name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col overflow-hidden max-h-screen">
                <div
                    style={{ transform: `translateX(${tabValue * -100}%)` }}
                    className="flex grow w-full will-change-transform transition duration-400"
                >
                    {tabPanels.map((panel, index) => (
                        <TabPanel value={tabValue} index={index} key={index}>
                            {panel}
                        </TabPanel>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TabsContainer;
