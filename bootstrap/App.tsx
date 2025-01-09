import createCache from '@emotion/cache'
import { CacheProvider, ThemeProvider } from '@emotion/react'

import AppLayout from '@/components/AppLayout'
import GlobalStyled from '@/components/GlobalStyled'

const cache = createCache({
  key: 'css',
  prepend: true
})

const App = () => {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={{}}>
        <GlobalStyled />
        <AppLayout />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App
