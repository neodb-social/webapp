export default defineNuxtPlugin(() => {
  const { params } = useRoute()
  if (typeof params.neo_token === 'string') {
    const neoToken = useNeodbToken()
    neoToken.value = params.neo_token
  }
})
