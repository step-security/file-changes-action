import {Context} from '@actions/github/lib/context'
import {mock} from '.'
import {octokitMock} from '../octokit'

const github = mock()

describe('Testing GitHubMock object ...', () => {
  beforeAll(() => jest.restoreAllMocks())
  it('...GitHubMock is a mock', () => {
    expect(jest.isMockFunction(github.github.getOctokit)).toBe(true)
    expect(github.context).toMatchObject(new Context())
  })
  it('...GitHubMock mocks GitHub', () => {
    const {getOctokit} = require('@actions/github')
    const mockOctokit = getOctokit('test')
    expect(mockOctokit).toMatchObject(octokitMock)
  })
  it('...GitHubMock mocks unauthorized GitHub', () => {
    const GitHub = mock()
    expect(jest.isMockFunction(GitHub.github.getOctokit)).toBe(true)
  })
  it('...GitHubMock mocks authorizing GitHub', () => {
    const GitHub = mock()
    const octokit = GitHub.github.getOctokit('token')
    expect(jest.isMockFunction(GitHub.github.getOctokit)).toBe(true)
    expect(GitHub.github.getOctokit).toBeCalledWith('token')
    expect(octokit).toMatchObject(octokitMock)
  })
})
