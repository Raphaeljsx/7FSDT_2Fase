import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Garante que a resolução de módulos use o diretório do frontend (onde está node_modules)
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
