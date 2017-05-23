import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class SeemlyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const { html, head } = renderPage()
    const styles = flush()
    return { html, head, styles }
  }

  render () {
    return (
      <html lang='en'>
        <Head>
          <style>{`
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
