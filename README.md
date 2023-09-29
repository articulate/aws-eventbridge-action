# aws-eventbridge-action

Send events to [AWS EventBridge](https://aws.amazon.com/eventbridge/) from your
GitHub Action workflow.

## Usage

See [action.yml](action.yml) for a detailed list of inputs and outputs.

```yaml
- uses: articulate/aws-eventbridge-action@v2
  with:
    event-bus-name: my-bus-name-or-arn
    source: github.actions
    detail-type: ci
    detail: ${{ toJSON(github.event) }}
```

To send events, you'll need to configure AWS credentials. You can either set
environment variables `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and optionally
`AWS_SESSION_TOKEN`. Or we recommend using [aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials).

## Development / Publishing

See [CONTRIBUTING](CONTRIBUTING.md) for more information
