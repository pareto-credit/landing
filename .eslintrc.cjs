module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:astro/recommended",
        "@zajno/eslint-config",
        "plugin:react-hooks/recommended",
    ],
    "overrides": [
        {
            "files": ["*.astro"],
            "parser": "astro-eslint-parser",
            "parserOptions": {
                "project": "tsconfig.json",
                "sourceType": "module",
                "parser": "@typescript-eslint/parser",
                "extraFileExtensions": [".astro"],
            },
            "rules": {
              // override/add rules settings here, such as:
              // "astro/no-set-html-directive": "error"
            },
          },
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": ["tsconfig.json"],
        "ecmaVersion": "latest",
        "sourceType": "module",
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
      "indent": [ 'warn', 4, { "SwitchCase": 1 } ],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-namespace": "off"
    }
}