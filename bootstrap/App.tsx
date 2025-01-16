import createCache from '@emotion/cache'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import 'antd/dist/reset.css'

import AppLayout from '@/components/AppLayout'
import ComponetFactory from '@/components/ComponetFactory'
import GlobalStyled from '@/components/GlobalStyled'

const cache = createCache({
  key: 'css',
  prepend: true
})
const showFactory: boolean = true

const App = () => {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={{ namespace: 'ant' }}>
        <GlobalStyled />
        {showFactory ? <ComponetFactory /> : <AppLayout />}
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App
