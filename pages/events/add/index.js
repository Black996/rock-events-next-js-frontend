import { parseCookies } from "@/helpers/index";

export { default } from "./add";

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req);
    return {
        props: {
            token
        }
    }
}