// vite.config.ts
import { sveltekit } from "file:///home/elkcloner/git/clinic-cms-frontend/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import * as path from "path";
var __vite_injected_original_dirname = "/home/elkcloner/git/clinic-cms-frontend";
var config = {
  optimizeDeps: {
    include: ["lodash.get", "lodash.isequal", "lodash.clonedeep"]
  },
  plugins: [sveltekit()],
  resolve: {
    alias: {
      "$": path.resolve(__vite_injected_original_dirname, "src"),
      "$i18n": path.resolve("./src/i18n/"),
      "$components": path.resolve("./src/components/"),
      "$modals": path.resolve("./src/modals/")
    }
  },
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"]
  }
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9lbGtjbG9uZXIvZ2l0L2NsaW5pYy1jbXMtZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2Vsa2Nsb25lci9naXQvY2xpbmljLWNtcy1mcm9udGVuZC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9lbGtjbG9uZXIvZ2l0L2NsaW5pYy1jbXMtZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tICdAc3ZlbHRlanMva2l0L3ZpdGUnO1xuaW1wb3J0IHR5cGUgeyBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCBjb25maWc6IFVzZXJDb25maWcgPSB7XG5cdG9wdGltaXplRGVwczoge1xuICAgICAgICBpbmNsdWRlOiBbJ2xvZGFzaC5nZXQnLCAnbG9kYXNoLmlzZXF1YWwnLCAnbG9kYXNoLmNsb25lZGVlcCddXG4gICAgfSxcblx0cGx1Z2luczogW3N2ZWx0ZWtpdCgpXSxcblx0cmVzb2x2ZToge1xuXHRcdGFsaWFzOiB7XG5cdFx0XHQnJCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcblx0XHRcdCckaTE4bic6IHBhdGgucmVzb2x2ZSgnLi9zcmMvaTE4bi8nKSxcblx0XHRcdCckY29tcG9uZW50cyc6IHBhdGgucmVzb2x2ZSgnLi9zcmMvY29tcG9uZW50cy8nKSxcblx0XHRcdCckbW9kYWxzJzogcGF0aC5yZXNvbHZlKCcuL3NyYy9tb2RhbHMvJylcblx0XHR9XG5cdH0sXG5cdHRlc3Q6IHtcblx0XHRpbmNsdWRlOiBbJ3NyYy8qKi8qLnt0ZXN0LHNwZWN9Lntqcyx0c30nXVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVTLFNBQVMsaUJBQWlCO0FBRWpVLFlBQVksVUFBVTtBQUZ0QixJQUFNLG1DQUFtQztBQUl6QyxJQUFNLFNBQXFCO0FBQUEsRUFDMUIsY0FBYztBQUFBLElBQ1AsU0FBUyxDQUFDLGNBQWMsa0JBQWtCLGtCQUFrQjtBQUFBLEVBQ2hFO0FBQUEsRUFDSCxTQUFTLENBQUMsVUFBVSxDQUFDO0FBQUEsRUFDckIsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sS0FBVSxhQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUNsQyxTQUFjLGFBQVEsYUFBYTtBQUFBLE1BQ25DLGVBQW9CLGFBQVEsbUJBQW1CO0FBQUEsTUFDL0MsV0FBZ0IsYUFBUSxlQUFlO0FBQUEsSUFDeEM7QUFBQSxFQUNEO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDTCxTQUFTLENBQUMsOEJBQThCO0FBQUEsRUFDekM7QUFDRDtBQUVBLElBQU8sc0JBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==
