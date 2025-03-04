import { stringifyQuery } from 'ufo'

export default defineEventHandler(async (event) => {
  let { server, origin } = getRouterParams(event)
  server = server.toLocaleLowerCase().trim()
  origin = decodeURIComponent(origin)
  const app = await getApp(origin, server)

  if (!app) {
    throw createError({
      statusCode: 400,
      statusMessage: `App not registered for server: ${server}`,
    })
  }

  const { code } = getQuery(event)
  if (!code) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Missing authentication code.',
    })
  }

  try {
    const result: any = await $fetch(`https://${server}/oauth/token`, {
      method: 'POST',
      body: {
        client_id: app.client_id,
        client_secret: app.client_secret,
        redirect_uri: getRedirectURI(origin, server),
        grant_type: 'authorization_code',
        code,
        scope: 'read write follow push',
      },
      retry: 3,
    })

    const query: any = { server, token: result.access_token, vapid_key: app.vapid_key }

    const { public: { neodbServer } } = useRuntimeConfig()
    if (neodbServer) {
      // TODO exchange mastodon token for neo token
      const neo_token = 'foobar' || `fetchtokenfrom${neodbServer}`
      query.neo_token = neo_token
    }

    const url = `/signin/callback?${stringifyQuery(query)}`
    await sendRedirect(event, url, 302)
  }
  catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not complete log in.',
    })
  }
})
