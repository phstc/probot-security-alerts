import { Context } from 'probot'
export const SECURITY = 'security'

export async function createIssue(context: Context) {
  const alert = context.payload.alert
  const github = context.github
  const repo = context.payload.repository.name
  const owner = context.payload.repository.owner.login

  const title = `Security vulnerability found in ${alert.affected_package_name}`

  const body = `- Affected version ${alert.affected_package_name} ${
    alert.affected_range
  } \n- Fixed in ${alert.fixed_in}`

  await github.issues.create({
    owner,
    repo,
    title,
    body,
    labels: [SECURITY]
  })
}
