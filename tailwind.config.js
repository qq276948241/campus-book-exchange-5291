/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        navy: {
          50: "#f0f4ff",
          100: "#dde5ff",
          200: "#c2d0ff",
          300: "#9db2ff",
          400: "#758bff",
          500: "#5a63f6",
          600: "#4143e7",
          700: "#3234cf",
          800: "#0f172a",
          900: "#1e293b",
          950: "#020617",
        },
      },
      boxShadow: {
        'md': '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.1)',
        'lg': '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.1)',
        'card': '0 2px 8px rgba(30, 58, 138, 0.12)',
        'card-hover': '0 8px 24px rgba(30, 58, 138, 0.25)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      fontFamily: {
        sans: ['"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
