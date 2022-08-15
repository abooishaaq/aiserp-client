import { motion } from "framer-motion";

const Loader = () => (
    <>
        <motion.div
            className="flex justify-center align-center my-10 w-full"
            exit={{ opacity: 0, transition: { duration: 2 } }}
        >
            loading...
        </motion.div>
    </>
);

export default Loader;
