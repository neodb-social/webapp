import createClient from 'openapi-fetch'
import { ofetch } from 'ofetch'
import type { paths } from './generated'

// will be initialized by the plugin neo
export const useNeodbToken = () => useState<string>('neoToken')

export const isNeoAuthenticated = computed<boolean>(() => {
  const token = useNeodbToken()
  return token.value !== ''
})

export function useNeodbClient() {
  const { public: { neodbServer } } = useRuntimeConfig()
  const token = useNeodbToken()
  const { GET, PUT, DELETE, POST } = createClient<paths>({
    baseUrl: neodbServer,
    fetch: ofetch.native,
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
