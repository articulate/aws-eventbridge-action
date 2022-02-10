import * as core from '@actions/core';
import {
  EventBridgeClient,
  PutEventsCommand,
} from '@aws-sdk/client-eventbridge';

import { getEntry } from './event';
import { getEvent } from './inputs';

async function run(): Promise<void> {
  try {
    const client = new EventBridgeClient({
      region: core.getInput('aws-region'),
    });

    // validate detail is valid JSON
    const command = new PutEventsCommand({
      Entries: [getEvent()],
    });

    core.debug('Sending request to AWS');
    const response = await client.send(command);
    core.debug(
      `Recieved response from AWS: ${response.$metadata.httpStatusCode} ${response.$metadata.requestId}`,
    );

    const failed = response.FailedEntryCount || 0;
    const entry = getEntry(response);
    if (failed > 0) {
      throw new Error(
        `Could not send event. ${entry.ErrorCode}: ${entry.ErrorMessage}`,
      );
    }

    core.setOutput('event-id', entry.EventId);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();
