import { STORAGE_KEY_NEO_TOKEN } from '~/constants'

export default defineNuxtPlugin(() => {
  const { query } = useRoute()

  const neoToken = useNeodbToken()
  const cachedToken = useLocalStorage(STORAGE_KEY_NEO_TOKEN, '')
  if (typeof query.neo_token === 'string') {
    neoToken.value = query.neo_token
    cachedToken.value = query.neo_token
  }
  else {
    neoToken.value = cachedToken.value
  }
})
