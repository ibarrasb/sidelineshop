// tailwind.config.js
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";
import lineClamp from "@tailwindcss/line-clamp";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.25rem", lg: "2rem" },
    },
    extend: {
      colors: {
        // NEW palette (keeps the same keys to avoid code changes)
        "sideline-bg":   "#F5F7FB", // app background (light, neutral)
        "sideline-card": "#FFFFFF", // card surfaces
        "sideline-accent":"#4F46E5", // primary brand (indigo 600 vibe)
        "sideline-text": "#111827", // near-black readable text
        "sideline-logo": "#4F46E5", // logo/brand accent
      },
      fontFamily: {
        dancing: ["Dancing Script", "cursive"],
        noto: ["Noto Sans KR", "sans-serif"],
      },
      maxWidth: { app: "1230px" },
      borderRadius: { "2xl": "1.25rem" },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.06)",
        elevated: "0 12px 40px rgba(0,0,0,0.12)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-4px)" } },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "fade-in": "fade-in 200ms ease-out",
      },
    },
  },
  plugins: [forms, typography, aspectRatio, lineClamp],
};
