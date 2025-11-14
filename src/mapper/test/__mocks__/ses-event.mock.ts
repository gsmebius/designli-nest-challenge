export const sesEventMock = {
  Records: [
    {
      eventSource: 'aws:ses',
      ses: {
        receipt: {
          processingTimeMillis: 1500,
          spamVerdict: { status: 'PASS' },
          virusVerdict: { status: 'PASS' },
          spfVerdict: { status: 'PASS' },
          dkimVerdict: { status: 'PASS' },
          dmarcVerdict: { status: 'PASS' },
          recipients: ['destino@example.com'],
        },
        mail: {
          timestamp: '2023-09-15T10:00:00Z',
          source: 'origen@example.com',
          destination: ['destino@example.com'],
          messageId: 'abc123',
        },
      },
    },
  ],
};

export const sesEventFailMock = {
  Records: [
    {
      ses: {
        receipt: {
          processingTimeMillis: 500,
          spamVerdict: { status: 'FAIL' },
          virusVerdict: { status: 'FAIL' },
          spfVerdict: { status: 'FAIL' },
          dkimVerdict: { status: 'FAIL' },
          dmarcVerdict: { status: 'FAIL' },
        },
        mail: {
          timestamp: '2023-01-10T12:00:00Z',
          source: 'failer@example.com',
          destination: ['receiver@example.com'],
        },
      },
    },
  ],
};
