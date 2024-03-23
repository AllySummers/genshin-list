/** @type {import('prettier').Config} */
module.exports = {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindFunctions: ["clsx", "cn", "twmerge", "cva"],
  arrowParens: "always",
  bracketSameLine: false,
  bracketSpacing: true,
  editorconfig: true,
  endOfLine: "lf",
  jsonRecursiveSort: true,
  overrides: [
    {
      files: ".prettierrc",
      options: { parser: "json" },
    },
    {
      files: [".prettierrc", "*.json", ".*.json"],
      options: {
        printWidth: 80,
      },
    },
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      options: {
        printWidth: 120,
      },
    },
  ],
  plugins: ["prettier-plugin-package-perfection", "prettier-plugin-sort-json"],
  printWidth: 100,
  quoteProps: "as-needed",
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "none",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/types/(.*)$",
    "^@/backend/(.*)$",
    "^@/data/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "^@/contexts/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "^@/styles/(.*)$",
    "^@/app/(.*)$",
    "",
    "^[./]",
  ],
};
