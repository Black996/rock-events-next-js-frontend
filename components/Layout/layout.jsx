import Head from "next/head";
import {useRouter} from "next/router";
import styles from "@/styles/Layout.module.css"
import Showcase from "../Showcase";
import Header from "../Header";
import Footer from "../Footer";

function Layout({title,keywords,description, children}) {
  const router = useRouter();
    return (
      <div>
        <Head>
        <title> {title}</title>
        <meta name="descriptions" content={description}/>
        <meta name="keywords" content={keywords}/>
        </Head>

        <Header/>

        {router.pathname === "/" ? <Showcase/>: ""}
        <div className={styles.container}>{children}</div>
        <Footer/>
      </div>
      
    )
}

Layout.defaultProps = {
    title:"Rock Events | The Night is Lit Tonight",
    description: "Find the latest Rock Party and other musical events",
    keywords:"music, rock, metal, event"
}


export default Layout;