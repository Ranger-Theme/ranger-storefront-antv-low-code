interface ImportMetaEnv {
  DEV: boolean
  PROD: boolean
  REACT_APP_HOST_URL: string
  REACT_APP_API_URL: string
  REACT_APP_REDUX_LOGGER: string
  REACT_APP_MAP_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
