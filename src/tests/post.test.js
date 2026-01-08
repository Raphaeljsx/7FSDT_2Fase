const request = require('supertest')
const app = require('../app')

describe('POST /posts', () => {
  it('deve criar um post com sucesso', async () => {
    const response = await request(app).post('/posts').send({
      title: 'Post Teste',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      author: 'Professor'
    });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Post Teste')
  })
})