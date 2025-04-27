export type EnvType = 'development' | 'production'

const envType = import.meta.env.MODE as EnvType

export const isDev = envType === 'development'
export const isProd = envType === 'production'

const config = {
  apiBaseUrl: 'http://localhost:3000'
}

switch (envType) {
  case 'production':
    config.apiBaseUrl = 'https://serg.god-damn-what-the-fuck.com/api'
    break;
}

export { config }
