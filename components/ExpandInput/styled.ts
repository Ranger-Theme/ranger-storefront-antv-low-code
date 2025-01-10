import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledExpandInput = styled.div(({ theme }) => {
  const { namespace } = theme

  return css`
    position: relative;
    height: 32px;

    textarea {
      z-index: 5;
      overflow: hidden;
    }

    input {
      padding-right: 40px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .${namespace} {
      &-input-affix-wrapper {
        z-index: 5;

        .${namespace} {
          &-input-clear-icon {
            margin-right: 10px;
            z-index: 10;
          }
        }
      }
    }
  `
})

export const StyledExpandIcon = styled.span`
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
  z-index: 10;
`
