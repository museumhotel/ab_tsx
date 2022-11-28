import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="public/assets/fonts/Boom4Real.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="public/assets/fonts/CorporateGothicRegularWoff.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="public/assets/fonts/WalinyWoff.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="public/assets/fonts/XTypewriter-Regular-1964.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Add the modal wrapper */}
          <div id="modal"></div>
        </body>
      </Html>
    );
  }
}

/* export function NDocument() {
  return (
    <Html>
      <Head>
        <link
          href="http://fonts.cdnfonts.com/css/boom-for-real"
          rel="stylesheet"
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Head>
    </Html>
  );
} */
