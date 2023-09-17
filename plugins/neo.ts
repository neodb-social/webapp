export default defineNuxtPlugin(() => {
  const { params } = useRoute()
  if (typeof params.neo_token === 'string')
    useNeoToken(params.neo_token)
})
