import {writeFileSync, unlinkSync} from 'fs'
import {sync as findUpSync} from 'find-up'
import {each} from 'lodash'

export default eject

function eject(configFilepath, scripts) {
  /* eslint global-require:0,import/no-dynamic-require:0 */
  const packageJsonPath = findUpSync('package.json')
  const packageJson = require(packageJsonPath)
  packageJson.scripts = {}
  const sortedScripts = scripts.sort((a, b) => a.name.localeCompare(b.name))
  each(sortedScripts, ({name, script}) => {
    if (name === 'default') {
      name = 'start'
    }
    packageJson.scripts[name] = script
  })
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  unlinkSync(configFilepath)
}
