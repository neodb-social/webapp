import createClient from 'openapi-fetch'
import type { paths } from './generated'

// will be initialized by the plugin neo
export const useNeodbToken = () => useState<string>('neoToken')

export function useNeodbClient() {
  const { public: { neodbServer } } = useRuntimeConfig()
  const token = useNeodbToken()
  const { GET, PUT, DELETE, POST } = createClient<paths>({
    baseUrl: neodbServer,
    // @ts-expect-error ofetch is compatible despite typing
    fetch: useFetch,
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  })
  return {
    get: GET,
    put: PUT,
    delete: DELETE,
    post: POST,
  }
}
