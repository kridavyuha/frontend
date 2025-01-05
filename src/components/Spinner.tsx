import { Loader } from "@mantine/core"

export const Spinner = () => {
    return (
        <section
        style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <Loader size={"sm"} />
    </section>
    )
}