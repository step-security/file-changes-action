import {validateSubscription} from './SubscriptionHelper'
import {getInputs, inferInput} from './InputHelper'
import {writeOutput, writeFiles, sortChangedFiles} from './FilesHelper'
import {getChangedFiles, initClient} from './GithubHelper'
import {errorMessage} from './UtilsHelper'
import {setFailed as coreSetFailed} from '@actions/core'

// figure out if it is a PR or Push
export async function run(): Promise<void> {
  await validateSubscription()
  try {
    // get inputs
    const inputs = getInputs()
    // parse input
    const inferred = inferInput(
      inputs.pushBefore,
      inputs.pushAfter,
      inputs.prNumber
    )
    // prepare client
    const client = initClient(inputs.githubToken)
    // get changed files
    const changedFilesArray = await getChangedFiles(
      client,
      inputs.githubRepo,
      inferred
    )
    // sort changed files
    const changedFiles = sortChangedFiles(changedFilesArray)
    Object.keys(changedFiles).forEach(key => {
      // write file output
      writeFiles(inputs.fileOutput, key, changedFiles[key])
      // write output vars
      writeOutput(inputs.output, key, changedFiles[key])
    })
  } catch (error) {
    const pError = JSON.parse((error as Error).message)
    coreSetFailed(errorMessage(pError.from, pError))
    throw new Error(JSON.stringify(pError))
  }
}
/* istanbul ignore next */
if (!(process.env.INPUT_MOCK === 'true')) run()
