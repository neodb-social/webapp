export default defineNuxtPlugin(() => {
  const { params } = useRoute()
  if (typeof params.neo_token === 'string')
    useNeodbToken(params.neo_token)
})
