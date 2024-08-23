import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware({
  target: process.env.BACKEND_URL, // Your backend URL
  changeOrigin: true,
  pathRewrite: {
    "^/api": "", // Remove /api from the request
  },
});
