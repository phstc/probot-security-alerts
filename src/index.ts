import { Application } from 'probot'
import { createIssue } from './securityAlertHandler'

export = (app: Application) => {
  app.on('repository_vulnerability_alert.create', async context => createIssue(context))
}
