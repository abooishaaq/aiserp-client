import { motion } from "framer-motion";

const Drawer = (props: { open: boolean; children: React.ReactNode }) => {
    return (
        <>
            <motion.div
                className="flex justify-center align-center overflow-y-auto w-full fixed"
                initial={{ x: "0%" }}
                style={{ zIndex: 1200 }}
                animate={{
                    x: props.open ? "0%" : "-100%",
                    scaleX: props.open ? 1 : 0,
                }}
                transition={{
                    mass: 0.2,
                    duration: .2
                }}
            >
                {props.children}
            </motion.div>
        </>
    );
};

export default Drawer;
