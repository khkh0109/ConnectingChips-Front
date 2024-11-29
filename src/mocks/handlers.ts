import { http, HttpResponse } from 'msw';

export const handlers = [
  // Sample Code...
  http.get('/test', () => {
    return HttpResponse.json({
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),
];
