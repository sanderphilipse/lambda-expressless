const { Response } = require('./response');

describe('Response object', () => {
  it('set response status properly', () => {
    const cb = jest.fn();

    const response = new Response(null, cb);

    response.status(404);
    response.end();

    expect(cb).toHaveBeenCalledWith(null, {
      statusCode: 404,
      headers: {},
      body: ''
    });
  });

  it('send body properly', () => {
    const cb = (err, response) => {
      expect(response.body).toBe('hello');
    };

    const response = new Response(null, cb);

    response.send('hello');
  });

  it('set content-type', () => {
    const cb = (err, response) => {
      expect(response.headers).toBe({
        'content-type': 'text/html'
      });
    };
    const response = new Response(null, cb);

    response.type('text/html');

  });


  it('get header', () => {
    const cb = (err, response) => {};

    const response = new Response(null, cb);

    response.set('X-Header', 'a');

    expect(response.get('X-Header')).toBe('a');
    // Should work case insensitive
    expect(response.get('x-Header')).toBe('a');
  });
});

