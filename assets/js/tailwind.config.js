/* =====================================================================
   The Lens Perspective Photography — Tailwind (Play CDN) configuration
   Modern editorial system: warm off-white · ink · rose/claret accent ·
   deep-plum dark sections. Display = Fraunces, Body = Inter.
   Token NAMES are kept stable so all existing pages restyle at once.
   ===================================================================== */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background": "#faf7f2",
        "surface": "#ffffff",
        "surface-dim": "#f0e8df",
        "surface-bright": "#ffffff",
        "surface-container-lowest": "#f3ece4",
        "surface-container-low": "#ffffff",
        "surface-container": "#f7f1ec",
        "surface-container-high": "#efe7df",
        "surface-container-highest": "#e9ded4",
        "surface-variant": "#efe7df",
        "on-background": "#1a1614",
        "on-surface": "#1a1614",
        "on-surface-variant": "#6e645c",
        "outline": "#9a8e83",
        "outline-variant": "#e6ddd3",
        /* rose / claret accent (was "gold") */
        "secondary": "#c2415c",
        "secondary-fixed": "#a63149",
        "secondary-fixed-dim": "#c2415c",
        "secondary-container": "#f7d9df",
        "on-secondary": "#ffffff",
        "on-secondary-fixed": "#ffffff",
        "on-secondary-fixed-variant": "#7a1f31",
        "on-secondary-container": "#7a1f31",
        /* plum highlight */
        "tertiary": "#7a3350",
        "tertiary-fixed": "#b06a85",
        "tertiary-fixed-dim": "#7a3350",
        "tertiary-container": "#f3dde6",
        "on-tertiary": "#ffffff",
        "on-tertiary-fixed": "#2c0f1c",
        "on-tertiary-fixed-variant": "#5b2238",
        "on-tertiary-container": "#5b2238",
        /* deep plum (dark sections / footer) */
        "primary": "#2a1620",
        "primary-fixed": "#3e2230",
        "primary-fixed-dim": "#2a1620",
        "primary-container": "#f3dde6",
        "on-primary": "#ffffff",
        "on-primary-fixed": "#fbeef2",
        "on-primary-fixed-variant": "#5b2238",
        "on-primary-container": "#2a1620",
        "surface-tint": "#c2415c",
        "error": "#b3261e",
        "error-container": "#f9dedc",
        "on-error": "#ffffff",
        "on-error-container": "#410e0b",
        "inverse-surface": "#2a1620",
        "inverse-on-surface": "#faf0ec",
        "inverse-primary": "#f1b8c4"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.625rem",
        xl: "1rem",
        "2xl": "1.5rem",
        full: "9999px"
      },
      spacing: {
        "container-max": "1480px",
        "section-gap": "150px",
        "margin-mobile": "24px",
        "margin-desktop": "72px",
        "gutter": "28px"
      },
      maxWidth: {
        "container-max": "1480px"
      },
      fontFamily: {
        "body-lg": ["Inter", "sans-serif"],
        "headline-md": ["Fraunces", "serif"],
        "display-lg-mobile": ["Fraunces", "serif"],
        "body-md": ["Inter", "sans-serif"],
        "label-caps": ["Inter", "sans-serif"],
        "display-lg": ["Fraunces", "serif"],
        "headline-lg": ["Fraunces", "serif"]
      },
      fontSize: {
        "body-lg": ["19px", { lineHeight: "32px", letterSpacing: "0", fontWeight: "300" }],
        "headline-md": ["32px", { lineHeight: "40px", fontWeight: "500" }],
        "display-lg-mobile": ["44px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "28px", fontWeight: "400" }],
        "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.22em", fontWeight: "600" }],
        "display-lg": ["88px", { lineHeight: "92px", letterSpacing: "-0.03em", fontWeight: "400" }],
        "headline-lg": ["50px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "400" }]
      }
    }
  }
};
