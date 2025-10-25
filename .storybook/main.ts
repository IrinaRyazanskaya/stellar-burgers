import { DefinePlugin } from "webpack";
import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
  swc: (config) => ({
    ...config,
    jsc: {
      ...config.jsc,
      transform: {
        ...config.jsc?.transform,
        react: {
          ...config.jsc?.transform?.react,
          runtime: "automatic",
        },
      },
    },
  }),
  webpackFinal: async (webpackConfig) => {
    webpackConfig.plugins = webpackConfig.plugins ?? [];

    webpackConfig.plugins.push(
      new DefinePlugin({
        __MODE__: JSON.stringify(webpackConfig.mode),
        __BURGER_API_CLIENT__: JSON.stringify("mock"),
        __BURGER_API_BASE_URL__: JSON.stringify(""),
      }),
    );

    return webpackConfig;
  },
};

export default config;
