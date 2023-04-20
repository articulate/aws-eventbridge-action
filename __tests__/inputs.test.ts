import { getEvent } from '../src/inputs';

test.each([
  ['', undefined],
  ['foo', ['foo']],
  ['foo,bar', ['foo', 'bar']],
])('returns an event entry', (resourcesInput, resourcesExpect) => {
  process.env['INPUT_DETAIL'] = '{"foo":"bar"}';
  process.env['INPUT_EVENT-BUS-NAME'] = 'test-bus';
  process.env['INPUT_SOURCE'] = 'com.github.actions';
  process.env['INPUT_RESOURCES'] = resourcesInput;
  process.env['INPUT_DETAIL-TYPE'] = 'action-test';

  expect(getEvent()).toEqual({
    EventBusName: 'test-bus',
    Source: 'com.github.actions',
    Resources: resourcesExpect,
    DetailType: 'action-test',
    Detail: '{"foo":"bar"}',
  });
});

test('throws an error if detail is not valid JSON', () => {
  process.env['INPUT_DETAIL'] = 'foobar';

  expect(() => getEvent()).toThrow('detail is not valid JSON');
});

test('throws error if required fields are missing', () => {
  process.env['INPUT_DETAIL'] = '{}';
  process.env['INPUT_EVENT-BUS-NAME'] = '';

  expect(() => getEvent()).toThrow(
    'Input required and not supplied: event-bus-name',
  );
});
