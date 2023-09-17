import createClient from 'openapi-fetch'
import type { paths } from './generated'

// will be initialized by the plugin neo
export const useNeodbToken = (init?: string) => useState<string>('neoToken', () => init ?? '')

export function useNeodbClient() {
  const { public: { neodbServer } } = useRuntimeConfig()
  const { GET, PUT, DELETE, POST } = createClient<paths>({
    baseUrl: neodbServer,
    // @ts-expect-error ofetch is compatible despite typing
    fetch: $fetch,
    headers: {
      Authorization: `Bearer ${useNeodbToken().value}`,
    },
  })
  return {
    get: GET,
    put: PUT,
    delete: DELETE,
    post: POST,
  }
}
