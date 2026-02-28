import http from 'http'

const BUTTON_COMPONENT = {
  name: 'button',
  description: 'Button component',
  latest: '1.0.0',
  versions: ['1.0.0'],
  categories: ['forms'],
  requires_alpine: false,
  requires: [],
  laravel: '^11 || ^12',
}

const BUTTON_FILES = {
  'resources/views/components/ui/button/button.blade.php':
    '<button class="btn">Click</button>\n',
  'resources/js/ui/button.js': 'export default () => ({})\n',
}

export async function startMockRegistryServer(): Promise<{
  url: string
  stop: () => Promise<void>
}> {
  const server = http.createServer((req, res) => {
    const requestUrl = new URL(req.url ?? '/', 'http://127.0.0.1')

    if (requestUrl.pathname === '/api/v1/components') {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(
        JSON.stringify({
          data: {
            button: BUTTON_COMPONENT,
          },
          count: 1,
        }),
      )
      return
    }

    if (requestUrl.pathname === '/api/v1/components/button') {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(
        JSON.stringify({
          data: {
            ...BUTTON_COMPONENT,
            files: BUTTON_FILES,
          },
        }),
      )
      return
    }

    res.writeHead(404, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ message: 'Not found' }))
  })

  await new Promise<void>((resolve, reject) => {
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => resolve())
  })

  const address = server.address()
  if (!address || typeof address === 'string') {
    throw new Error('Unable to start mock registry server')
  }

  return {
    url: `http://127.0.0.1:${address.port}`,
    stop: () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error) reject(error)
          else resolve()
        })
      }),
  }
}
