import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
	palette: {
    // standard colors, consistent across themes
		mode: 'light',
		primary: {
			50: '#E6F8FA',
			100: '#C2EDF2',
			200: '#9CE1EA',
			300: '#75D5E1',
			400: '#58C9D8',
			500: '#42B0C5',
			600: '#3593A1',
			700: '#29757C',
			800: '#1E5757',
			900: '#143838',
			main: '#3B82F6',
		},
		secondary: {
			50: '#F5F3FF',
			100: '#EDE9FE',
			200: '#DDD6FE',
			300: '#C4B5FD',
			400: '#A78BFA',
			500: '#8B5CF6',
			600: '#7C3AED',
			700: '#6D28D9',
			800: '#5B21B6',
			900: '#4C1D95',
			main: '#64748B',
		},
		accent: {
			50: '#F8FAFC',
			100: '#F1F5F9',
			200: '#E2E8F0',
			300: '#C8D5E1',
			400: '#94A3B8',
			500: '#64748B',
			600: '#475569',
			700: '#334155',
			800: '#1E293B',
			900: '#0F172A',
		},
    grey: {
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#303030',
      900: '#27272A',
    },

    text: {
      primary: '#1A1A1A',
      secondary: '#4A4A55',
      disabled: '#A1A1AA',
      primaryBtn: '#1A1A1A', // todo: update
      primaryBtnHover: '#2F2F2F',
      secondaryBtn: "#1A1A1A",
      secondaryBtnHover: "#374151",
      muted: "#4A4A55",
    },
    background: {
        paper: "#EDEDED",
        navbar: '#ffffffb5',
        primaryBtn: "#D6D6D6",
        primaryBtnHover: "#C4C4C4",
        secondaryBtn: "#C2C2C2",
        secondaryBtnHover: "#AFAFAF",
        muted: "#dfdfdf",
        secondary:"#c7d0d8",
    },
	},
	typography: {
		fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
			"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
	},
});

export default lightTheme;
