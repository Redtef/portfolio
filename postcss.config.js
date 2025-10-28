// Use the postcss adapter package for Tailwind (required by Tailwind v4+
// when used with PostCSS/Turbopack). This keeps compatibility across
// Next/Turbopack environments.
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
