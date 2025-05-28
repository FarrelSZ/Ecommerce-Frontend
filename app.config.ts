export default defineAppConfig({
  ui: {
    colors: {
      primary: "orange",
      gray: "muted",
    },
    buttons: {
      rounded: "rounded-sm",
      font: "font-normal",
      padding: {
        sm: "py-3 px-5",
      },
      variant: {
        soft: "bg-{color}-100 border border-{color}-500 hover:bg-{color}-50",
      },
      color: {
        white: {
          solid: "shadow-none ring-gray-200",
        },
      },
    },
    cards: {
      // rounded: "rounded-none",
      // ring: "ring-0",
    },
    verticalNavigation: {
      font: "font-normal",
    },
    accordions: {
      item: {
        padding: "p-0",
        color: "text-slate-800",
      },
    },
    inputs: {
      rounded: "rounded-sm",
    },
    checkboxs: {
      label: "font-normal text-black/80",
      base: "disabled:bg-gray-100",
      rounded: "rounded-sm",
    },
    badges: {
      rounded: "rounded-sm",
    },
    // custom breadcrumb (link active dan non active dan disabled)
    breadcrumb: {
      variants: {
        active: {
          true: {
            link: "text-primary font-semibold",
          },
          false: {
            link: "text-muted font-medium",
          },
        },
        disabled: {
          true: {
            link: "cursor-not-allowed opacity-75",
          },
        },
      },
    },
  },
});
