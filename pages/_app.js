import { useEffect } from "react";
import { useRouter } from "next/router";

const GA_TRACKING_ID = "G-Z91XFZHSSE";

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url) => {
            window.gtag("config", GA_TRACKING_ID, {
                page_path: url,
            });
        };

        router.events.on("routeChangeComplete", handleRouteChange);

        // If the component is unmounted, unsubscribe from the event
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;