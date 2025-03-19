import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("docx/:id", "routes/docx.tsx"),
  route("pdf/:id", "routes/pdf.tsx"),
  route("xlsx/:id", "routes/xlsx.tsx"),
  route("pptx/:id", "routes/pptx.tsx"),
] satisfies RouteConfig;
