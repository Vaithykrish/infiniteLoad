# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# React
# React


ISSUE:
Error: Cannot find module @rollup/rollup-darwin-arm64. npm has a bug related to optional dependencies 

FIX:
1.Clear npm cache and install dependencies:
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

-> Still facing issue after clearing cache, try to install manually
npm install @rollup/rollup-darwin-arm64



