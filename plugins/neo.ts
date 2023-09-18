export default defineNuxtPlugin(() => {
  const { query } = useRoute()

  if (typeof query.neo_token === 'string') {
    // TODO cache the token in IDB as the masto token
    const neoToken = useNeodbToken()
    neoToken.value = query.neo_token
  }
})
