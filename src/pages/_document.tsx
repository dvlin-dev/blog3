import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel='preload'
            href='/fonts/inter-var-latin.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
          {/* TODO */}
          <script
            async
            defer
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || ''}
            src='https://analytics.umami.is/script.js'
            data-domains='blog.dvlin.com'
          />
        {/* metadata test */}
          <meta name="twitter:card"  content="summary_large_image" />
          <meta name="twitter:image" content="https://dvlin.oss-cn-beijing.aliyuncs.com/wegic-5-13-preview.png" />
          <meta property="og:url"         content="https://pre.dvlin.com" />
          <meta property="og:title"       content="dvlin" />
          <meta property="og:description" content="dvlin blog" />
          <meta property="og:image"       content="https://dvlin.oss-cn-beijing.aliyuncs.com/wegic-5-13-preview.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

<script></script>;
