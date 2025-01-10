import { Button, Form } from 'antd'

import ExpandInput from '@/components/ExpandInput'

const QueryForm = () => {
  const [form] = Form.useForm()

  const handleSearch = () => {
    const values = form.getFieldsValue()
    console.info(values)
  }

  return (
    <Form form={form}>
      <Form.Item name="search">
        <ExpandInput inputProps={{ allowClear: true }} textAreaProps={{ allowClear: true }} />
      </Form.Item>
      <Button type="primary" onClick={handleSearch}>
        Search
      </Button>
    </Form>
  )
}

export default QueryForm
