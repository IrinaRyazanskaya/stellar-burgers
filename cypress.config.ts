import { defineConfig } from "cypress";
import dotenvPlugin from "cypress-dotenv";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4000",
    setupNodeEvents(on, config) {
      const updatedConfig = dotenvPlugin(config, null, true);
      return updatedConfig;
    },
  },
});
