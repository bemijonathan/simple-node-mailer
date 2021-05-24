const Mail = require('./index')


describe('Name of the group', () => {
    const mailMock = jest.fn(Mail.mailer)

    const newmail = new mailMock("hello")

    it("mock to have been called", () => {
        expect(mailMock).toHaveBeenCalledWith("hello", "tope")
    })
});