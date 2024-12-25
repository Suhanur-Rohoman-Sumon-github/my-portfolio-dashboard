module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config: {
      module: {
        rules: {
          test: RegExp; 
          type: string; generator: { filename: string; };
        }[];
      };
    }) => {
    config.module.rules.push(
      {
        test: /\.(mp4|webm|ogg|mov)$/, 
        type: "asset/resource",
        generator: {
          filename: "static/media/[name].[hash][ext]",
        },
      },
      {
        test: /\.pdf$/, 
        type: "asset/resource",
        generator: {
          filename: "static/documents/[name].[hash][ext]",
        },
      }
    );
    return config;
  },
};
