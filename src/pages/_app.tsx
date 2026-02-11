//Made with 🩷 by fluxon

import { type AppType } from "next/dist/shared/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "@/styles/globals.css";
import "@/styles/locomotive-scroll.css";

import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div lang={"en"} className={dmSans.className}>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-E5LET3X3SJ"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E5LET3X3SJ');
          `,
        }}
      />
      
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
};

export default MyApp;
