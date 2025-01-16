import { Button, Form } from 'antd'

import ExpandInput from '@/components/ExpandInput'
import ExpandSelect from '@/components/ExpandSelect'
import { StyledFactory, StyledComponents } from './styled'

const ComponetFactory = () => {
  const options: any[] = new Array(6)
    .fill({
      label: 2024,
      value: 2024
    })
    .map((item: any, index: number) => {
      return {
        label: item.value + index,
        value: item.value + index
      }
    })

  const handleFinish = (values: any) => {
    console.info(values)
  }

  return (
    <StyledFactory>
      <Form onFinish={handleFinish}>
        <StyledComponents>
          <Form.Item name="search">
            <ExpandInput />
          </Form.Item>
          <Form.Item name="select">
            <ExpandSelect selectProps={{ options }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              <span>Save</span>
            </Button>
          </Form.Item>
        </StyledComponents>
      </Form>
    </StyledFactory>
  )
}

export default ComponetFactory
