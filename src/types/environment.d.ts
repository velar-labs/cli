declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      VELAR_ENV: 'development' | 'production' | 'test'
      VELYX_REGISTRY_URL: string
    }
  }
}

export {}
