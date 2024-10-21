import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import promise from "eslint-plugin-promise";
import _import from "eslint-plugin-import";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import stylistic from "@stylistic/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...fixupConfigRules(compat.extends(
    "plugin:promise/recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
)), {
    plugins: {
        promise: fixupPluginRules(promise),
        import: fixupPluginRules(_import),
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        "@stylistic": stylistic,
    },

    languageOptions: {
        globals: {
            ...globals.commonjs,
            ...globals.node,
            chance: true,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "commonjs",

        parserOptions: {
            project: true,
        },
    },

    rules: {
        // Generic rules
        "newline-before-return": "error",
        "no-debugger": "warn",
        "no-shadow": "off",
        "no-unused-vars": "off",
        "no-use-before-define": "off",
        
        // Typescript ESLint
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/no-shadow": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-use-before-define": "error",
        
        // Stylistic
        "@stylistic/arrow-parens": "warn",
        "@stylistic/linebreak-style": ["warn", "windows"],
        "@stylistic/max-len": ["warn", 100],
        "@stylistic/no-multiple-empty-lines": ["error", {
            max: 1,
        }],
        "@stylistic/object-curly-spacing": ["error", "always"],
        
        // Import
        "import/extensions": "off",
        "import/no-unresolved": "off",
        "import/order": ["warn", {
            groups: ["builtin", "external", "parent"],
            "newlines-between": "always",

            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },
        }],
    },
}];