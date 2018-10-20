import { Application } from 'probot'
import { createIssue } from './securityAlertHandler'

export = (app: Application) => {
  const SECURITY = 'security'

  app.on('repository_vulnerability_alert.create', async context => {
    const alert = context.payload.alert
    const title = `Security vulnerability found in ${
      alert.affected_package_name
    }`

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
  })
}
