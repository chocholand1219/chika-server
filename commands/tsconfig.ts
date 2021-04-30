import * as jsonfile from 'jsonfile'
import * as path from 'path'
import {env} from '../src/env'
import * as tsconfig from '../tsconfig.json'

const content: any = tsconfig
content.compilerOptions.outDir = '.tmp'
content.include = ['src/**/*']

const filePath = path.join(process.cwd(), 'tsconfig.build.json')
jsonfile.writeFile(filePath, content, {spaces: 2}, (err) => {
  if (err === null) {
    process.exit(0)
  } else {
    console.error('Failed to generate the tsconfig.build.json', err)
    process.exit(1)
  }
})

jsonfile.writeFile(
  path.join(process.cwd(), 'ormconfig.json'),
  env.db,
  {spaces: 2},
  (err) => {
    if (err === null) {
      process.exit(0)
    } else {
      console.error('Failed to generate the tsconfig.build.json', err)
      process.exit(1)
    }
  }
)
