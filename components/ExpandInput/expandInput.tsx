import React, { useMemo, useState } from 'react'
import { Input } from 'antd'
import { ExpandAltOutlined, ShrinkOutlined } from '@ant-design/icons'
import type { InputProps, TextAreaProps } from 'antd/es/input'

import { StyledExpandInput, StyledExpandIcon } from './styled'

export interface ExpandInputProps extends React.HTMLAttributes<HTMLDivElement> {
  inputProps?: InputProps
  textAreaProps?: TextAreaProps
  renderIcon?: (value: boolean) => React.ReactNode
}

const ExpandInput: React.FC<ExpandInputProps> = ({
  renderIcon,
  inputProps = {},
  textAreaProps = {
    rows: 4
  },
  ...props
}) => {
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleExpand = () => {
    setExpanded((prev: boolean) => !prev)
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
    <StyledExpandInput {...props}>
      {expanded ? <Input.TextArea {...textAreaProps} /> : <Input {...inputProps} />}
      <StyledExpandIcon>{finalIcon}</StyledExpandIcon>
    </StyledExpandInput>
  )
}

export default ExpandInput
