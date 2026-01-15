
import path from 'path'

import { generateApi } from 'swagger-typescript-api'

generateApi({
  name: 'api',
  output: path.resolve(process.cwd(), './src/gen'),
  url: 'http://localhost:8080/swagger/v1/swagger.json',
  httpClientType: 'axios',
  extractEnums: true,
  modular: true,
  cleanOutput: true,
  moduleNameIndex: 1,

  // types
  primitiveTypeConstructs: () => ({
    string: {
      $default: 'string',
      'date-time': 'Date',
    },
  }),
}).catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Error generating API:', error)
})
