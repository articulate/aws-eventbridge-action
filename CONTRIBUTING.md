# Contributing

Here are some guidelines when contributing to aws-eventbridge-action.

## Setup

This action uses the `node20` runtime, so make sure you have Node.js 20 installed.
We use [act](https://github.com/nektos/act) to test the action locally. As of this
writing, the latest release does not support the `node20` runtime, so you'll need
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

If you make a change to `src`, you'll need to recompile with `npm run all` to work
with Actions. This will also run all linters and tests.

When writing commits, we try to follow [Angular Commit Message Conventions](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format).

## Publishing

Once you are ready to release the current state of the default branch, you
will need to create a release for the version.

### Versioning

We use [semantic versioning](https://semver.org/) for our releases.

You can also manually determine the next release by viewing the most recent
[release](https://github.com/articulate/aws-eventbridge-action/releases). Your
version will be similar in format to `v1.0.2` (PATCH) or `v1.1.0` (MINOR)

### Releasing

* From the [release](https://github.com/articulate/aws-eventbridge-action/releases)
  page, Click `Draft a new release`
* Click `Choose a tag` and enter your version name and click the tag or
  `+create new tag on publish` if you are versioning manually
* Enter the version name as the `Release Title`
* Click the Generate release notes to populate the description
* Assuming applicable, leave `Set as the latest release` clicked
* Click `Publish release`

Alternatively, you can use the gh client.

* Example: `gh release create v1.0.2 --generate-notes`

### Releasing / Scripted Method (Optional)

For a more automated experience, we recommend mloberg's git-release extension to
tag your release. Requires GitHub cli `gh` and `git` to be installed locally.

* [git-release](https://github.com/mloberg/dotfiles/blob/main/bin/git-release)
* Drop the script in a local path and make sure it's executable
* Run `git release [type] --release` to generate the next tag for your release,
  push it up, and create a release complete with notes. (check script for more
  syntax options)

### Update the major version tag

Some actions will reference this using the _v2_ tag. We will need to update that
tag locally and force push it.

Then, update the v2 tag to point to the current commit.

```shell
git checkout main
git pull
git tag -fa v2 -m "Update v2 tag"
git push origin v2 --force
```
