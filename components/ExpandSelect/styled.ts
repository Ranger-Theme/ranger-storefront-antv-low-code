import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledExpandSelect = styled.div(({ theme }) => {
  const { namespace } = theme

  return css`
    .${namespace} {
      &-input-affix-wrapper {
      }

      &-select-dropdown {
        padding: 0;
        border-radius: 5px;
        border: 1px solid #d9d9d9;
      }
    }
  `
})

export const StyledDropdown = styled.div(() => {
  return css``
})

export const StyledSearch = styled.div(() => {
  return css`
    padding: 10px;
  `
})

export const StyledLabel = styled.p(() => {
  return css`
    padding: 5px 10px;

    &.check {
      border-top: 1px solid #d9d9d9;
    }
  `
})

export const StyledOption = styled.div(({ theme }) => {
  const { namespace } = theme

  return css`
    .${namespace} {
      &-checkbox-wrapper {
        display: flex;
      }
    }
  `
})

export const StyledActions = styled.div(() => {
  return css`
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #d9d9d9;
  `
})
