import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("docx/:id", "preview/docx.tsx"),
  route("pdf/:id", "preview/pdf.tsx"),
  route("xlsx/:id", "preview/xlsx.tsx"),
  route("pptx/:id", "preview/pptx.tsx"),
] satisfies RouteConfig;
