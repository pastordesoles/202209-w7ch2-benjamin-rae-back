import { model, Schema } from "mongoose";

const RobotSchema = new Schema({
  name: String,
  image: String,
  speed: Number,
  strength: Number,
  createdOn: String,
});

const Robot = model("Robot", RobotSchema, "robots");

export default Robot;
