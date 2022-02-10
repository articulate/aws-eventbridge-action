import {
  PutEventsCommandOutput,
  PutEventsResultEntry,
} from '@aws-sdk/client-eventbridge';

export function getEntry(
  output: PutEventsCommandOutput,
): Required<PutEventsResultEntry> {
  const entry = output.Entries ? output.Entries[0] : undefined;

  return {
    EventId: entry?.EventId || '',
    ErrorCode: entry?.ErrorCode || 'Unknown Error',
    ErrorMessage: entry?.ErrorMessage || 'An unknown error occured.',
  };
}
