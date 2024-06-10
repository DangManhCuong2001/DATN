import { ExpandMoreRounded } from "@mui/icons-material";
import { Theme, ThemeOptions, darken } from "@mui/material";

export type TTHEME_MODE = "dark" | "light";

const round = (value: number): number => Math.round(value * 1e5) / 1e5;
const pxToRem = (size: number): string => `${size / 16}rem`;
const buildVariant = (
  fontWeight: number,
  size: number,
  lineHeight: number,
  letterSpacing?: number
) => ({
  fontWeight,
  fontSize: pxToRem(size),
  lineHeight: `${round(lineHeight / size)}`,
  ...(letterSpacing !== undefined
    ? { letterSpacing: `${round(letterSpacing / size)}em` }
    : {}),
});

declare module "@mui/material/styles" {
  interface TypographyVariants {
    body3: React.CSSProperties;
    caption2: React.CSSProperties;
  }
}
export function getThemeConfig(mode: TTHEME_MODE): ThemeOptions {
  const getColor = (darkColor: string, lightColor: string) => {
    return mode === "dark" ? darkColor : lightColor;
  };

  return {};
}

export function getThemedComponent(theme: Theme): ThemeOptions {
  return {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ".SnackbarItem-wrappedRoot .SnackbarItem-contentRoot .SnackbarItem-message":
            {
              ...theme.typography.body3,
            },
          // disable arrow from input number
          // Chrome, Safari, Edge, Opera
          "input::-webkit-outer-spin-button,input::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          // Firefox
          "input[type=number]": {
            MozAppearance: "textfield",
          },
          "div.MuiBox-root": {
            "::-webkit-scrollbar": {
              height:
                "4px" /* height of horizontal scrollbar ← You're missing this */,
              width: "4px" /* width of vertical scrollbar */,
            },
            "::-webkit-scrollbar-track": {
              borderRadius: 0,
              background: "#f7f7f7",
            },

            "::-webkit-scrollbar-thumb": {
              borderRadius: 10,
              background: theme.palette.mode == "dark" ? "#8b8b8b" : "#D5D5D5",
              cursor: "pointer",
              "&:hover": {
                background: "#d3d3d3",
              },
            },
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(3px)",
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            "& .MuiTypography-root": {
              color: "white",
              fontWeight: 600,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            borderColor: "#C3C4C3!important",
            borderRadius: 24,
            height: "46px",
            ".MuiInputBase-root.MuiOutlinedInput-root": {
              background: "#111C18",
              borderRadius: "24px!important",
              color: "white",
              height: "46px",
              paddingRight: "33px",
              ".MuiInputBase-input": {
                padding: "13px 33px",
                "&.Mui-disabled": {
                  WebkitTextFillColor: "#FFDF57",
                  opacity: 1,
                  fontWeight: 600,
                },
              },
              ".MuiOutlinedInput-notchedOutline": {
                borderRadius: "24px!important",
                border: "none",
                outline: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
                borderColor: theme.palette.primary.main + "!important",
              },
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {},
        styleOverrides: {
          root: {
            textTransform: "capitalize",
            borderRadius: 18,
            // font: 'normal normal normal 14px/19px Open Sans',
            height: "36px",
            // fontWeight: 'bold',
            boxShadow: "none",
          },
          sizeMedium: {
            ...theme.typography.button,
            lineHeight: 1,
            padding: "8px 24px",
          },
          sizeLarge: {
            padding: "10px 24px",
          },
          sizeSmall: {
            padding: "4px 8px",
            minWidth: "55px",
            height: "30px",
          },
          containedSecondary: {
            backgroundColor: theme.palette.secondary.dark,
            color: "#FFFFFF",
            "&:hover, &.Mui-focusVisible": {
              backgroundColor: darken(theme.palette.secondary.dark, 0.2),
            },
          },
          containedPrimary: {
            fontWeight: "bold",
            backgroundColor: theme.palette.primary.main,
            color: "#FFFFFF",
            "&:hover, &.Mui-focusVisible": {
              backgroundColor: darken(theme.palette.primary.main, 0.1),
              boxShadow: " 0px 2px 5px 0px " + theme.palette.primary.main,
            },
          },
          outlinedPrimary: {
            fontWeight: "bold",
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            "&:hover, &.Mui-focusVisible": {
              boxShadow: " 0px 2px 5px 0px " + theme.palette.primary.main,
            },
          },
          textSecondary: {
            color: theme.palette.mode === "dark" ? "#585F5A" : "#585F5A",
          },
          textPrimary: {
            "&:hover": {
              backgroundColor: darken(theme.palette.primary.light, 0.5),
            },
          },
        },
        variants: [
          //   {
          //     props: { variant: "gradient" },
          //     style: {
          //       color: theme.palette.common.white,
          //       background: theme.palette.gradient.main,
          //       transition: "all 250ms ease",
          //       "&:hover, &.Mui-focusVisible": {
          //         opacity: 0.9,
          //       },
          //     },
          //   },
        ],
      },
      MuiTypography: {
        defaultProps: {
          variant: "body1",
          variantMapping: {
            h1: "h1",
            h2: "h2",
            h3: "h3",
            h4: "h4",
            h5: "h5",
            h6: "h6",
            body1: "p",
            body2: "p",
            subtitle1: "p",
            subtitle2: "p",
            button: "p",
            caption: "p",
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: pxToRem(20),
          },
          fontSizeSmall: {
            fontSize: pxToRem(16),
          },
          fontSizeLarge: {
            fontSize: pxToRem(24),
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: theme.shadows[1],
          },
        },
      },
      MuiDialog: {
        defaultProps: {
          scroll: "body",
          PaperProps: {
            elevation: 0,
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            paddingTop: theme.spacing(2.5),
            // paddingTop: `${theme.spacing(2.5)} !important`, // prevent override
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            padding: theme.spacing(2, 2.5),
            backgroundColor:
              theme.palette.mode === "dark" ? "#1F353C" : "#EDEDED",
            "&.MuiDialogTitle-root+.MuiDialogContent-root": {
              paddingTop: theme.spacing(2.5),
            },
          },
        },
      },
      MuiUseMediaQuery: {
        defaultProps: {
          noSsr: true,
        },
      },
      MuiTooltip: {
        defaultProps: {
          arrow: true,
          placement: "top",
        },
        styleOverrides: {
          tooltip: {
            ...theme.typography.body3,
            boxShadow:
              "rgb(0 0 0 / 20%) 0px 0px 2px, rgb(0 0 0 / 10%) 0px 2px 10px",
            backgroundColor: "rgba(0,0,0,0.9)",
            padding: theme.spacing(1),
            maxWidth: 400,
            color: "#fff",
          },
          arrow: {
            "&:before": {
              boxShadow:
                "rgb(0 0 0 / 20%) 0px 0px 2px, rgb(0 0 0 / 10%) 0px 2px 10px",
              backgroundColor: "rgba(0,0,0,0.9)",
            },
            color: "#fff",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            "&:not(.Mui-focused):hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.secondary.dark,
              borderWidth: 2,
            },
          },
          focused: {
            "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline":
              {
                borderColor: theme.palette.primary.main,
              },
          },
          input: {
            // padding: theme.spacing(1.5, 2),
          },
          notchedOutline: {
            borderColor: theme.palette.secondary.dark,
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            overflow: "hidden",
            borderRadius: 20,
            "&:first-of-type, &:last-of-type": {
              borderRadius: 20,
            },
            "&:before": {
              display: "none",
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            padding: theme.spacing(1, 2.5),
            backgroundColor: theme.palette.background.paper,
            // boxShadow: theme.palette.mode == 'dark' ? theme.shadows[1] : 'inset 0px 0px 6px #D5D9D985, 0px 3px 6px #00000014',
            "& .MuiAccordionSummary-content": {
              margin: 0,
              "&.Mui-expanded": {
                margin: 0,
              },
            },
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            padding: theme.spacing(3, 4.5),
            background: theme.palette.mode == "dark" ? "#1F353C" : "",
            // [theme.breakpoints.down("xsm")]: {
            //   padding: theme.spacing(3),
            // },
          },
        },
      },
      MuiButtonGroup: {
        styleOverrides: {
          root: {
            backgroundColor: "#C3C4C3",
            border: "1px solid #B8BEB9",
            borderRadius: 18,
            overflow: "hidden",
            ".MuiButtonBase-root": {
              paddingRight: "16px",
              paddingLeft: "16px",
            },
          },

          grouped: {
            minWidth: "85px",
            "&:not(:last-of-type)": {
              borderTopRightRadius: 18,
              borderBottomRightRadius: 18,
              borderRightColor: "inherit",
            },
            "&:not(:first-of-type)": {
              borderTopLeftRadius: 18,
              borderBottomLeftRadius: 18,
            },
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          root: {
            "& .MuiBackdrop-root": {
              backdropFilter: "none",
            },
          },
        },
      },
      MuiPagination: {
        defaultProps: {
          color: "primary",
          shape: "rounded",
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              color: "#fff",
              boxShadow: "0px 0px 10px 1px rgba(196, 196, 196, 0.5)",
            },
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          IconComponent: ExpandMoreRounded,

          sx: {
            pl: 1,
            fieldset: {
              //   borderColor: theme.palette.background.border,
            },
          },
        },
      },
    },
  };
}
