import createClient from 'openapi-fetch'
import type { paths } from './generated'

// will be initialized by the plugin neo
export const useNeoToken = (init?: string) => useState<string>('neoToken', () => init ?? '')

export function useNeoClient() {
  const { public: { neoServer } } = useRuntimeConfig()
  const { GET, PUT, DELETE, POST } = createClient<paths>({
    baseUrl: neoServer,
    // @ts-expect-error ofetch is compatible despite typing
    fetch: $fetch,
    headers: {
      Authorization: `Bearer ${useNeoToken().value}`,
    },
  })
  return {
    get: GET,
    put: PUT,
    delete: DELETE,
    post: POST,
  }
}
