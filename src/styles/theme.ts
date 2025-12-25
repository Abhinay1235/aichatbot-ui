import { createTheme, ThemeOptions } from '@mui/material/styles'

// Mobile-first breakpoints
const breakpoints = {
  values: {
    xs: 0,
    sm: 320, // Mobile start
    md: 768, // Tablet start
    lg: 1024, // Desktop start
    xl: 1920,
  },
}

// Color palette with WCAG AA contrast ratios (4.5:1 minimum)
const palette = {
  primary: {
    main: '#1976d2', // Blue - tech/AI theme
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#ffffff', // 4.5:1 contrast
  },
  secondary: {
    main: '#9c27b0', // Purple
    light: '#ba68c8',
    dark: '#7b1fa2',
    contrastText: '#ffffff',
  },
  success: {
    main: '#2e7d32', // Green - 4.5:1 contrast
    light: '#4caf50',
    dark: '#1b5e20',
    contrastText: '#ffffff',
  },
  error: {
    main: '#d32f2f', // Red - 4.5:1 contrast
    light: '#ef5350',
    dark: '#c62828',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
    contrastText: '#ffffff',
  },
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
    contrastText: '#ffffff',
  },
  background: {
    default: '#f5f5f5',
    paper: '#ffffff',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)', // High contrast
    secondary: 'rgba(0, 0, 0, 0.6)',
  },
}

// Typography - Mobile-first (16px base to prevent iOS zoom)
const typography = {
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  htmlFontSize: 16, // Base 16px for mobile
  h1: {
    fontSize: '2rem', // 32px
    fontWeight: 600,
    lineHeight: 1.2,
    '@media (max-width: 767px)': {
      fontSize: '1.75rem', // 28px on mobile
    },
  },
  h2: {
    fontSize: '1.75rem', // 28px
    fontWeight: 600,
    lineHeight: 1.3,
    '@media (max-width: 767px)': {
      fontSize: '1.5rem', // 24px on mobile
    },
  },
  h3: {
    fontSize: '1.5rem', // 24px
    fontWeight: 600,
    lineHeight: 1.4,
    '@media (max-width: 767px)': {
      fontSize: '1.25rem', // 20px on mobile
    },
  },
  h4: {
    fontSize: '1.25rem', // 20px
    fontWeight: 600,
    lineHeight: 1.4,
    '@media (max-width: 767px)': {
      fontSize: '1.125rem', // 18px on mobile
    },
  },
  h5: {
    fontSize: '1.125rem', // 18px
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h6: {
    fontSize: '1rem', // 16px
    fontWeight: 600,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '1rem', // 16px - readable on mobile
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem', // 14px
    lineHeight: 1.5,
  },
  button: {
    fontSize: '1rem', // 16px
    fontWeight: 500,
    textTransform: 'none', // Keep original case
  },
}

// Spacing system - Mobile-first (4px base unit)
const spacing = 4 // 4px base unit

// Component overrides for mobile-first and accessibility
const components: ThemeOptions['components'] = {
  MuiButton: {
    styleOverrides: {
      root: {
        minHeight: 44, // Minimum touch target (44x44px)
        minWidth: 44,
        padding: '10px 16px', // Adequate padding for touch
        borderRadius: 8,
        fontSize: '1rem', // 16px base
        fontWeight: 500,
      },
      sizeSmall: {
        minHeight: 36,
        minWidth: 36,
        padding: '8px 12px',
        fontSize: '0.875rem',
      },
      sizeLarge: {
        minHeight: 48,
        minWidth: 48,
        padding: '12px 24px',
        fontSize: '1.125rem',
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        minWidth: 44, // Minimum touch target
        minHeight: 44,
        padding: 12, // Adequate padding
      },
      sizeSmall: {
        minWidth: 36,
        minHeight: 36,
        padding: 8,
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        fontSize: '1rem', // 16px to prevent iOS zoom
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        minHeight: 32,
        fontSize: '0.875rem',
      },
    },
  },
  MuiFab: {
    styleOverrides: {
      root: {
        minWidth: 56, // Material Design FAB size
        minHeight: 56,
      },
    },
  },
  // Focus indicators - High contrast, visible
  MuiButtonBase: {
    styleOverrides: {
      root: {
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: palette.primary.main,
          outlineOffset: '2px',
        },
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: palette.primary.main,
          outlineOffset: '2px',
          borderRadius: '2px',
        },
      },
    },
  },
}

// Create theme
export const theme = createTheme({
  breakpoints,
  palette,
  typography,
  spacing,
  components,
  shape: {
    borderRadius: 8,
  },
})

// Dark theme variant (optional)
export const darkTheme = createTheme({
  breakpoints,
  palette: {
    ...palette,
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.6)',
    },
  },
  typography,
  spacing,
  components,
  shape: {
    borderRadius: 8,
  },
})

