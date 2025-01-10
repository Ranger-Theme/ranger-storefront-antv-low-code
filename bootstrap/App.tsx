import createCache from '@emotion/cache'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import { Button, Form } from 'antd'

// import AppLayout from '@/components/AppLayout'
import ExpandInput from '@/components/ExpandInput'
import GlobalStyled from '@/components/GlobalStyled'

const cache = createCache({
  key: 'css',
  prepend: true
})

const App = () => {
  const [form] = Form.useForm()

  const handleSearch = () => {
    console.info(form.getFieldsValue())
  }

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={{}}>
        <GlobalStyled />
        <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <div
            style={{
              width: 300
            }}>
            <Form form={form}>
              <Form.Item name="search">
                <ExpandInput />
              </Form.Item>
              <Button type="primary" onClick={handleSearch}>
                Search
              </Button>
            </Form>
          </div>
        </div>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App
