import dev from "./dev";
import prod from "./prod";

interface Config {
  mongoURI: string;
}

let config: Config;

if (process.env.NODE_EN === "production") {
  config = {
    ...prod
  };
} else {
  config = {
    ...dev
  }
}

export default config;
