const AuthService = require("../auth");
const UserRepository = require("../../repository/user");

describe('register', () => {
  // Positive case
  it('success: should return the registered user', async () => {
    // Create mock for user repository
    const mockUserRepository = new UserRepository();
    const registerRequest = {
      "name": "adhi",
      "email": "asd@gmail.com",
      "password": "adhi123"
    }

    const expectedRegisterResponse = {
      statusCode: 201,
      message: "User registered successfully",
      createdUser: {
        "id": 20,
        "name": "adhi",
        "email": "asd@gmail.com",
        "password": "$2b$10$H.F8zVhDLlyQdmnTqo/YNev.sjUyHv6mqQyRqbdPsX3pnsDSz3ZV2",
        "updatedAt": "2024-08-05T14:50:33.834Z",
        "createdAt": "2024-08-05T14:50:33.834Z"
      }
    }

    mockUserRepository.insert = jest.
      fn().
      mockImplementation(() => Promise.resolve(expectedRegisterResponse.createdUser));

    const authService = new AuthService(mockUserRepository);
    const registeredUser = await authService.register(registerRequest);

    expect(registeredUser.statusCode).toEqual(expectedRegisterResponse.statusCode);
    expect(registeredUser.message).toEqual("User registered successfully");
    expect(registeredUser.createdUser.id).toEqual(expectedRegisterResponse.createdUser.id);
    expect(registeredUser.createdUser.email).toEqual(expectedRegisterResponse.createdUser.email);
  });
});