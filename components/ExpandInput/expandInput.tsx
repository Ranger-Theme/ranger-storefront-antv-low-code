import React, { useMemo, useState } from 'react'
import { Input } from 'antd'
import { ExpandAltOutlined, ShrinkOutlined } from '@ant-design/icons'
import type { InputProps, TextAreaProps } from 'antd/es/input'

import { StyledExpandInput, StyledExpandIcon } from './styled'

export interface ExpandInputProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string
  value?: string
  inputProps?: InputProps
  textAreaProps?: TextAreaProps
  renderIcon?: (value: boolean) => React.ReactNode
  onChange?: (values: any) => void
}

export const defaultRows = 8

const ExpandInput: React.FC<ExpandInputProps> = ({
  renderIcon,
  inputProps = {},
  textAreaProps = {
    rows: defaultRows
  },
  ...props
}) => {
  const { id, value, onChange, ...rest } = props
  const textFiledProps = { id, value }
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleExpand = () => {
    setExpanded((prev: boolean) => !prev)
  }

  const hanldeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e)
    expanded ? textAreaProps?.onChange?.(e as any) : inputProps?.onChange?.(e as any)
  }

  const finalIcon = useMemo(() => {
    if (renderIcon && typeof renderIcon === 'function') {
      const icon = renderIcon(expanded)

      if (icon && React.isValidElement(icon)) {
        return React.cloneElement(icon as React.ReactElement, {
          onClick: (e: React.MouseEvent) => {
            handleExpand()
            if (typeof (icon as React.ReactElement).props?.onClick === 'function') {
              ;(icon as React.ReactElement).props.onClick(e)
            }
          }
        })
      }
    }
    const Icon = expanded ? ShrinkOutlined : ExpandAltOutlined
    return <Icon onClick={handleExpand} />
  }, [expanded])

  return (
    <StyledExpandInput {...rest}>
      {expanded ? (
        <Input.TextArea
          {...textAreaProps}
          {...textFiledProps}
          onChange={hanldeChange}
          autoSize={{ minRows: textAreaProps?.rows ?? defaultRows }}
        />
      ) : (
        <Input {...inputProps} {...textFiledProps} onChange={hanldeChange} />
      )}
      <StyledExpandIcon>{finalIcon}</StyledExpandIcon>
    </StyledExpandInput>
  )
}

export default ExpandInput
