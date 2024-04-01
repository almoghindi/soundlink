const { CourierClient } = require("@trycourier/courier");
const HttpError = require("../models/http-error");
const sendMail = async (existingUser) => {
  if (!existingUser) {
    const error = new HttpError("User not found", 500);
    return next(error);
  }

  const link = `${process.env.CLIENT_URL}/resetPassword/${existingUser._id}`;

  const courier = new CourierClient({
    authorizationToken: process.env.COURIER_API_KEY,
  });

  try {
    await courier.send({
      message: {
        content: {
          title: "Reset password",
          body: "Your reset password link is " + link,
        },
        to: {
          email: existingUser.email,
        },
      },
    });
  } catch {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }
};

export default sendMail;
