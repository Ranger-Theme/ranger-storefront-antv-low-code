import type { FC } from 'react'
import { css, Global } from '@emotion/react'

const globalCss = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  ul,
  ol {
    padding: 0;
    margin: 0;

    li {
      list-style-type: none;
    }
  }

  dl,
  dd {
    margin: 0;
  }

  p {
    margin: 0;
  }

  img {
    height: auto;
    max-width: 100%;
  }

  body {
    margin: 0;
  }
`

const GlobalStyled: FC = () => {
  return <Global styles={globalCss} />
}

export default GlobalStyled
