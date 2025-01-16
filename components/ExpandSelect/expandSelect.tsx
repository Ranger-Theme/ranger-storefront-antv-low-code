import React from 'react'
import { Checkbox, Input, Select, Switch } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { SelectProps, BaseOptionType, DefaultOptionType } from 'antd/es/select'

import {
  StyledExpandSelect,
  StyledDropdown,
  StyledSearch,
  StyledLabel,
  StyledActions,
  StyledOption
} from './styled'
import { valueType } from 'antd/es/statistic/utils'

export interface ExpandSelectProps<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType
> extends React.HTMLAttributes<HTMLDivElement> {
  id?: string
  value?: string
  selectProps?: SelectProps<ValueType, OptionType>
  onChange?: (values: any) => void
}

const ExpandSelect: React.FC<ExpandSelectProps> = ({ selectProps = {}, ...props }) => {
  const { id, value, onChange, ...rest } = props
  const { options, labelInValue = false, ...selectRest } = selectProps
  const selectFiledProps = { id, value }

  const hanldeChange = (value: valueType, option?: any) => {
    onChange?.(value)
    selectRest?.onChange?.(value, option)
  }

  const handleToggleSelect = (e: any) => {
    if (e.target.checked) {
    }
  }

  const optionRender = (option: any) => {
    return (
      <StyledOption>
        <Checkbox>
          <span dangerouslySetInnerHTML={{ __html: option.data.label }} />
        </Checkbox>
      </StyledOption>
    )
  }

  const dropdownRender = (menu: React.ReactElement) => {
    return (
      <StyledDropdown>
        <StyledSearch>
          <Input
            placeholder="搜索"
            allowClear
            suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
          />
        </StyledSearch>
        <StyledLabel>已选项</StyledLabel>
        {/* {menu} */}
        <StyledLabel className="check">可选项</StyledLabel>
        {menu}
        <StyledActions>
          <Checkbox onChange={handleToggleSelect}>全选(80)</Checkbox>
          <span>
            <Switch defaultChecked />
            <span>展示已关闭</span>
          </span>
        </StyledActions>
      </StyledDropdown>
    )
  }

  return (
    <StyledExpandSelect {...rest}>
      <Select
        allowClear
        autoClearSearchValue
        showSearch={false}
        listHeight={160}
        labelInValue={labelInValue}
        {...selectRest}
        {...selectFiledProps}
        mode="multiple"
        maxTagCount="responsive"
        options={options}
        menuItemSelectedIcon={null}
        dropdownRender={dropdownRender}
        optionRender={optionRender}
        onChange={hanldeChange}
        getPopupContainer={(node: any) => node.parentNode}
      />
    </StyledExpandSelect>
  )
}

export default ExpandSelect
