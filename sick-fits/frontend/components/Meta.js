import Head from 'next/head'

export default () => (
  <div>
    <Head>
      <title>My page title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    </Head>
    <p>Hello world!</p>
  </div>
)