import * as core from '@actions/core'
import { wait } from './wait.js'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Waiting ${ms} milliseconds ...`)

    // Log the current timestamp, wait, then log the new timestamp
    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    // Set outputs for other workflow steps to use
    core.setOutput('time', new Date().toTimeString())
    core.summary
      .addHeading('Advanced Job Summary', 'h2')
      .addImage(
        'https://octodex.github.com/images/droidtocat.png',
        'Droidtocat',
        {
          width: '64',
          height: '64'
        }
      )
      .addTable([
        [
          { data: 'Plik', header: true },
          { data: 'Wynik', header: true }
        ],
        ['foo.js', 'Pass'],
        ['bar.js', 'Fail'],
        ['test.js', 'Pass']
      ])
      .addLink('Mój niestandardowy link', 'https://writeabout.net')
      .write()
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
