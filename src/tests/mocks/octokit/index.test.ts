import {octokitMock} from '.'

describe('Testing Octokit object ...', () => {
  beforeAll(() => jest.restoreAllMocks())
  it('...Octokit is a mock', () => {
    expect(octokitMock).toHaveProperty('paginate')
    expect(octokitMock).toHaveProperty('rest.pulls')
    expect(octokitMock).toHaveProperty('rest.repos')
    expect(octokitMock).not.toHaveProperty('actions')
  })
})
