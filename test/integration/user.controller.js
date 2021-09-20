let { init } = require("../../server");

const test_email = "email@mail.com",
  test_pass = "p@55w0rd",
  test_email2 = "johndoe@mail.com",
  test_pass2 = "j0hnD03",
  test_token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiOWZiMDFkZTAtMWQ2My00ZDA5LTk0MTUtOTBlMGI0ZTkzYjlhIiwiYXVkIjoidXJuOmF1ZGllbmNlOnN0YW5kYXJkIiwiaXNzIjoidXJuOmlzc3VlcjpzdGFuZGFyZCIsImdyb3VwIjoic3RhbmRhcmQiLCJpYXQiOjE2MzE3MTI2ODYsImV4cCI6MTYzMTcyNzA4Nn0.5NCoPKzetH4dqT5nbjDERyCwWCAzqYnj8TfFYjl0nyE",
  url_prefix = "/user";

module.exports = (server) =>
  describe("User API", () => {
    let server;
    beforeEach(async () => {
      server = await init();
    });

    afterEach(async () => {
      await server.stop();
    });
    it.only("GET /user returns a single user", async () => {
      const res = await server.inject({
        method: "get",
        url: `${url_prefix}/profile`,
        headers: {
          Authorization: test_token,
        },
      });
      console.debug(res.result);
      expect(res.result).toStrictEqual(
        expect.objectContaining({
          role: expect.any(String),
        })
      );
    });

    it("POST /authenticate - Authenticates user and returns JWT token", async () => {
      const res = await server.inject({
        method: "post",
        url: `${url_prefix}/authenticate`,
        payload: {
          email: test_email,
          password: test_pass,
        },
        headers: {
          Authorization: test_token,
        },
      });
    });
  });

/* 
c

let server = (async () => await init())();

module.exports = () =>
  describe("User controller tests", () => {
    async function mockRequest(mock, fn) {
      await mock(fn);
    }

    // User authentication mock request fn
    const mockAuthReq = jest.fn(async function (handler) {
      // debugger;
      return await handler({
        payload: {
          email: testEmail,
          password: testPass,
        },
      }).catch(console.error);
    });

    // User registration mock request fn
    const mockRegisterReq = jest.fn(async function (handler) {
      // debugger;
      return await handler({
        payload: {
          email: testEmail2,
          password: testPass2,
          referrerId: "9fb01de0-1d63-4d09-9415-90e0b4e93b9a",
        },
      }).catch(console.error);
    });

    // Run callback after server setup
    async function onServerLoaded(fn) {
      await server.then(async (setup) => {
        fnController = controller(setup);
        fn(fnController);
      });
    }

    // User login test
    const userLoginTest = async (controller) => {
      debugger;
      return await mockRequest(mockAuthReq, controller.authenticate).then((res) => {
        debugger;
        expect(mockAuthReq.mock.results[0].value).resolves.toStrictEqual({
          access_token: expect.any(String),
        });
      });
    };

    // User registration test
    const userRegistrationTest = async (controller) =>
      await mockRequest(mockRegisterReq, controller.create).then((res) => {
        expect(mockAuthReq.mock.results[0].value).resolves.toStrictEqual();
      });

    // Main test object
    test("Authenticates user and returns a generated JWT token", async () => {
      await onServerLoaded(userLoginTest);
    });

    test("Creates new user", async () => {
      await onServerLoaded(userRegistrationTest);
    });
  });
 */
