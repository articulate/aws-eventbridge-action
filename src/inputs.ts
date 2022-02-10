import * as core from '@actions/core';
import { PutEventsRequestEntry } from '@aws-sdk/client-eventbridge';

export function getEvent(): PutEventsRequestEntry {
  const detail = core.getInput('detail');
  try {
    JSON.parse(detail);
  } catch (error) {
    throw new Error(`detail is not valid JSON. ${error}`);
  }

  const resources = core.getInput('resources');

  return {
    EventBusName: core.getInput('event-bus-name', { required: true }),
    Source: core.getInput('source', { required: true }),
    Resources: resources === '' ? undefined : resources.split(','),
    DetailType: core.getInput('detail-type', { required: true }),
    Detail: detail,
  };
}
