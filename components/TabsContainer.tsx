import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import TabPanel from "./TabPanel";
import { useEffect, useState } from "react";

interface ITabsContainerProps {
  tabNames: string[];
  tabPanels: JSX.Element[];
}

const TabsContainer = ({ tabNames, tabPanels }: ITabsContainerProps) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, value: number) => {
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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable">
          {tabNames.map((name, index) => (
            <Tab label={name} key={index} />
          ))}
        </Tabs>
      </Box>
      {tabPanels.map((panel, index) => (
        <TabPanel value={tabValue} index={index} key={index}>
          {panel}
        </TabPanel>
      ))}
    </>
  );
};

export default TabsContainer;
