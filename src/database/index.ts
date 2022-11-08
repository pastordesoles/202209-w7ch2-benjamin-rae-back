import mongoose from "mongoose";
import debugConfig from "debug";
import chalk from "chalk";

const debug = debugConfig("robots:database");

export const connectDb = async (url: string) => {
  try {
    await mongoose.connect(url);
    mongoose.set("toJSON", {
      virtuals: true,
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return ret;
      },
    });
    debug(chalk.green(`Successfully connected to the data base`));
  } catch (error: unknown) {
    debug(
      chalk.red(
        `There was an error connecting to data base: ${
          (error as Error).message
        }`
      )
    );
  }
};
