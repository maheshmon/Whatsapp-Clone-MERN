import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  iss: {
    type: String,
  },
  nbf: {
    type: Number,
  },
  aud: {
    type: String,
  },
  sub: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  email_verified: {
    type: Boolean,
  },
  azp: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },
  password: {
    type: String,
  },
  given_name: {
    type: String,
  },
  family_name: {
    type: String,
  },
  iat: {
    type: Number,
  },
  exp: {
    type: Number,
  },
  jti: {
    type: String,
  },
});

const user = mongoose.model("user", userSchema);

export default user;
