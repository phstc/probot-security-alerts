import { SECURITY, createIssue } from '../src/securityAlertHandler'

// See https://developer.github.com/v3/activity/events/types/#repositoryvulnerabilityalertevent
const SAMPLE_SECURITY_ALERT = {
  action: 'create',
  alert: {
    id: 7649605,
    affected_range: '0.2.0',
    affected_package_name: 'many_versioned_gem',
    external_reference: 'https://nvd.nist.gov/vuln/detail/CVE-2018-3728',
    external_identifier: 'CVE-2018-3728',
    fixed_in: '0.2.5',
    dismisser: {
      login: 'octocat',
      id: 1,
      node_id: 'MDQ6VXNlcjIxMDMxMDY3',
      avatar_url: 'https://github.com/images/error/octocat_happy.gif',
      gravatar_id: '',
      url: 'https://api.github.com/users/octocat',
      html_url: 'https://github.com/octocat',
      followers_url: 'https://api.github.com/users/octocat/followers',
      following_url:
        'https://api.github.com/users/octocat/following{/other_user}',
      gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/octocat/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/octocat/subscriptions',
      organizations_url: 'https://api.github.com/users/octocat/orgs',
      repos_url: 'https://api.github.com/users/octocat/repos',
      events_url: 'https://api.github.com/users/octocat/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/octocat/received_events',
      type: 'User',
      site_admin: true
    },
    dismiss_reason: 'No bandwidth to fix this',
    dismissed_at: '2017-10-25T00:00:00+00:00'
  },
  repository: {
    name: 'repo',
    owner: {
      login: 'owner'
    }
  }
}

const context = {
  payload: SAMPLE_SECURITY_ALERT,
  github: {
    issues: {
      create: jest.fn()
    }
  }
}

test('creates an issue', async () => {
  await createIssue(context)

  const alert = context.payload.alert
  const github = context.github
  const repo = context.payload.repository.name
  const owner = context.payload.repository.owner.login

  const title = `Security vulnerability found in ${alert.affected_package_name}`

  const body = `- Affected version ${alert.affected_package_name} ${
    alert.affected_range
  } \n- Fixed in ${alert.fixed_in}`

  expect(github.issues.create).toBeCalledWith({
    owner,
    repo,
    title,
    body,
    labels: [SECURITY]
  })
})
