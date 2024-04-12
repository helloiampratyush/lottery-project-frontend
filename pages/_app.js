import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import Header from "../components/Header"
import Head from "next/head"
import { NotificationProvider } from "web3uikit"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.studio.thegraph.com/query/50428/lottery/v0.0.8",
})

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>public Lottery</title>
                <meta name="description" content="web3 lottery" />
                <link rel="icon" href=" /bg.jpg" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

            </Head>

            <MoralisProvider initializeOnMount={false}>
                <ApolloProvider client={client}>
                  
                    <NotificationProvider>
                        <Header />
                        
                                <Component {...pageProps} />
                          
                    </NotificationProvider>
                 
                </ApolloProvider>
               
            </MoralisProvider>
        </div>
    )
}

export default MyApp