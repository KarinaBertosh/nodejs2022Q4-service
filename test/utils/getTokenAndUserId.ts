import { authRoutes } from '../endpoints';

const createUserDto = {
  login: 'TEST_AUTH_LOGIN',
  password: 'Tu6!@#%&',
};

const getTokenAndUserId = async (request) => {

  const req1 = await request
    .post(authRoutes.signup)
    .set('Accept', 'application/json')
    .send(createUserDto);

  const req2 = await request
    .post(authRoutes.login)
    .set('Accept', 'application/json')
    .send(createUserDto);

  console.log(444, req1.body);
  console.log(555, req2.body);
  // create user
  const {
    body: { id: mockUserId },
  } = await request
    .post(authRoutes.signup)
    .set('Accept', 'application/json')
    .send(createUserDto);


  // get token
  const {
    body: { accessToken },
  } = await request
    .post(authRoutes.login)
    .set('Accept', 'application/json')
    .send(createUserDto);



  if (mockUserId === undefined || accessToken === undefined) {
    throw new Error('Authorization is not implemented');
  }

  const token = `Bearer ${accessToken}`;

  return { token, mockUserId };
};

export default getTokenAndUserId;
