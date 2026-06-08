import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "2.5rem"
      }
    },
    extend: {
      colors: {
        background: "#f7f9fb",
        surface: "#f7f9fb",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f4f6",
        "surface-container": "#eceef0",
        "surface-container-high": "#e6e8ea",
        "surface-container-highest": "#e0e3e5",
        "on-surface": "#191c1e",
        "on-surface-variant": "#434655",
        outline: "#737686",
        "outline-variant": "#c3c6d7",
        primary: "#004ac6",
        "primary-container": "#2563eb",
        "on-primary": "#ffffff",
        secondary: "#515f74",
        success: "#10B981",
        warning: "#F59E0B",
        destructive: "#EF4444"
      },
      borderRadius: {
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        label: ["Geist", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        ambient: "0 10px 15px -3px rgb(15 23 42 / 0.10), 0 4px 6px -4px rgb(15 23 42 / 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
