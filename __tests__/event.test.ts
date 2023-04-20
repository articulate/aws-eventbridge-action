import { getEntry } from '../src/event';

test('returns entry', () => {
  const output = {
    $metadata: {},
    Entries: [
      {
        EventId: '1234-abcd-5678',
        ErrorCode: 'Test Error',
        ErrorMessage: 'Test error details.',
      },
    ],
  };
  expect(getEntry(output)).toEqual({
    EventId: '1234-abcd-5678',
    ErrorCode: 'Test Error',
    ErrorMessage: 'Test error details.',
  });
});

test('returns entry from empty result', () => {
  expect(getEntry({ $metadata: {} })).toEqual({
    EventId: '',
    ErrorCode: 'Unknown Error',
    ErrorMessage: 'An unknown error occured.',
  });
});
