import CustomError from "./CustomError.js";

describe("Given the class CustomError", () => {
  describe("When instantiated with message 'General pete', status 400 and public message'Something has petated'", () => {
    test("Then it should create an object with message 'General pete', status 400 and public message'Something has petated'", () => {
      const expectedCustomError = {
        message: "General pete",
        status: 400,
        publicMessage: "Something has petated",
      };
      const { message, status, publicMessage } = expectedCustomError;
      const messageProperty = "message";
      const statusProperty = "status";
      const publicMessageProperty = "publicMessage";

      const newCustomError = new CustomError(message, status, publicMessage);

      expect(newCustomError).toHaveProperty(messageProperty, message);
      expect(newCustomError).toHaveProperty(statusProperty, status);
      expect(newCustomError).toHaveProperty(
        publicMessageProperty,
        publicMessage
      );
    });
  });
});
