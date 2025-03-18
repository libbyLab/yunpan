import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("document/:id", "routes/document.$id.tsx")
] satisfies RouteConfig;
