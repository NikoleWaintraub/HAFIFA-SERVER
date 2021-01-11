// import app from '../app-test.js'
// import supertest from 'supertest'

// const request = supertest(app)

 import { logIn } from './functions';

it('should find user and pass', () => {
  const user = { name: 'Nikole', password: '1234' };

  return expect(logIn(user)).toBe(true)
})

// describe('test routes', () => {
//     it('should return 200 for get courses', async done => {
//       const res = await request.get('/Courses')
//       expect(res.status).toBe(200)
//       done()
//     })
//   })

  // export default request;