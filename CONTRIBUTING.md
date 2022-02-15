# Contributing

Here are some guidelines when contributing to aws-eventbridge-action.

## Setup

This action uses the `node16` runtime, so make sure you have Node.js 16 installed.
We use [act](https://github.com/nektos/act) to test the action locally. As of this
writing, the latest release does not support the `node16` runtime, so you'll need
to install the latest unreleased version, which requires Go. `go install github.com/nektos/act@master`

## Testing

To test the action, run `make`. This will update `dist` and run `act -j test`,
which runs `.github/workflows/test.yml#/jobs/test`.

To push events to AWS EventBridge, you'll need to create an event bridge with the
name of "" or update the value in the workflow (but don't commit it). You'll then
need to create a `.secrets` file containing AWS access credentials.

```bash
# .secrets
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
# Optional
AWS_SESSION_TOKEN=xxx
```

## Pull Request

Before creating a pull request, make sure code is properly tested. Either with
Jest or in the workflow.

Make sure tests pass with `npm test` and meet our styleguide with `npm run lint`
(use `npm run format` to try to autofix).

When writing commits, we try to follow [Angular Commit Message Conventions](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format).
