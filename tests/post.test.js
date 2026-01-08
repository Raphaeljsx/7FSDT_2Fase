const request = require('supertest');
const app = require('../src/app');

describe('POST /posts', () => {
  it('deve criar um post', async () => {
    const res = await request(app)
      .post('/posts')
      .set('Content-Type', 'application/json')
      .send({
        title: 'Post Teste',
        content: 'Conteúdo teste',
        author: 'Professor'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Post Teste');
  });
});