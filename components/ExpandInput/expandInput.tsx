import { ExpandAltOutlined, ShrinkOutlined } from '@ant-design/icons'
import { useClickAway } from 'ahooks'
import { Input } from 'antd'
import type { TextAreaProps } from 'antd/es/input'
import { clsx } from 'clsx'
import React, { useMemo, useRef, useState } from 'react'

import { StyledExpandIcon, StyledExpandInput } from './styled'

export interface ExpandInputProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string
  value?: string
  autoExpand?: boolean
  hidden?: boolean
  inputProps?: TextAreaProps
  textAreaProps?: TextAreaProps
  renderIcon?: (value: boolean) => React.ReactNode
  onChange?: (values: any) => void
}

export const autoSize = {
  minRows: 8,
  maxRows: 12
}

const ExpandInput: React.FC<ExpandInputProps> = ({
  renderIcon,
  autoExpand = true,
  hidden = true,
  inputProps = {
    allowClear: true
  },
  textAreaProps = {
    allowClear: true,
    autoSize
  },
  ...props
}) => {
  const { id, value, onChange, ...rest } = props
  const textFiledProps = { id, value }
  const expandRef = useRef<HTMLSpanElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleExpand = (e: any) => {
    e.stopPropagation()
    setExpanded((prev: boolean) => !prev)
    if (!expanded) {
      setTimeout(() => {
        textareaRef.current?.focus()
      }, 0)
    }
  }

  const handleFocus = () => {
    if (autoExpand) {
      setExpanded(true)
      setTimeout(() => {
        textareaRef.current?.focus()
      }, 0)
    }
  }

  const hanldeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e)
    expanded ? textAreaProps?.onChange?.(e as any) : inputProps?.onChange?.(e as any)
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const textarea: any = e.target
    setTimeout(() => {
      textarea.scrollTop = 0 // 强制滚动到顶部
    }, 0)
  }

  useClickAway(() => {
    setExpanded(false)
  }, expandRef)

  const finalIcon = useMemo(() => {
    if (renderIcon && typeof renderIcon === 'function') {
      const icon = renderIcon(expanded)

      if (icon && React.isValidElement(icon)) {
        return React.cloneElement(icon as React.ReactElement, {
          onClick: (e: React.MouseEvent) => {
            handleExpand(e)
            if (typeof (icon as React.ReactElement).props?.onClick === 'function') {
              ;(icon as React.ReactElement).props.onClick(e)
            }
          }
        })
      }
    }
    const Icon = expanded ? ShrinkOutlined : ExpandAltOutlined
    return <Icon onClick={handleExpand} />
  }, [expanded, renderIcon])

  return (
    <StyledExpandInput {...rest} className={clsx(rest?.className ?? '', { opened: expanded })}>
      {expanded ? (
        <>
          <span className="expand-textarea" ref={expandRef}>
            <Input.TextArea
              {...textAreaProps}
              {...textFiledProps}
              ref={textareaRef}
              onChange={hanldeChange}
              autoSize={textAreaProps?.autoSize ?? autoSize}
            />
          </span>
          {!hidden && <Input.TextArea {...inputProps} className="expand-input" rows={1} />}
        </>
      ) : (
        <Input.TextArea
          {...inputProps}
          {...textFiledProps}
          className="expand-input"
          rows={1}
          onChange={hanldeChange}
          onFocus={handleFocus}
          onPaste={handlePaste}
        />
      )}
      <StyledExpandIcon>{finalIcon}</StyledExpandIcon>
    </StyledExpandInput>
  )
}

export default ExpandInput
