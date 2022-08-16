const Drawer = (props: { open: boolean; children: React.ReactNode }) => {
    return (
        <>
            <div
                className="drawer-side flex justify-center align-center w-full fixed h-screen no-scroll"
                style={{
                    zIndex: 1200,
                    left: props.open ? "0" : "-100%",
                    transition: "all 0.2s ease-out",
                }}
            >
                {props.children}
            </div>
        </>
    );
};

export default Drawer;
