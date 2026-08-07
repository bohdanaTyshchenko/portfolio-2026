/**
 * Portfolio text styles from Figma
 * https://www.figma.com/design/J1tFZxxsgTyVWDEjfBjM6l/Portfolio?node-id=10-523
 *
 * Family: Helvetica Neue
 * Headings / button: Medium (500)
 * Body: Regular (400)
 * Letter-spacing: computed px from the Figma file
 * title / h1 / h2 / h3 / h5 are uppercase in the design system
 *
 * Prefer matching the HTML tag to the style name (h3 → typography.h3)
 * so DevTools and Figma labels stay in sync. Use <p> for body styles.
 *
 * | Style   | Size | Line height | Weight | Letter-spacing | Case       |
 * |---------|------|-------------|--------|----------------|------------|
 * | title   | 128  | 150         | 500    | -8px           | uppercase  |
 * | h1      | 65   | 70          | 500    | -4px           | uppercase  |
 * | h2      | 56   | 60          | 500    | -3.36px        | uppercase  |
 * | h3      | 36   | 44          | 500    | -1.8px         | uppercase  |
 * | h4      | 24   | 30          | 500    | -0.72px        | sentence   |
 * | h5      | 20   | 28          | 500    | -0.8px         | uppercase  |
 * | h6      | 16   | 1.3         | 500    | -0.32px        | sentence   |
 * | body-l  | 18   | 24          | 400    | -0.72px        | sentence   |
 * | body-m  | 16   | 28          | 400    | -0.32px        | sentence   |
 * | body-s  | 14   | 16          | 400    | -0.42px        | sentence   |
 * | caption | 10   | 14          | 400    | -0.3px         | sentence   |
 * | button  | 16   | 16          | 500    | -0.32px        | sentence   |
 */

export const typography = {
  title: "font-medium uppercase text-title",
  h1: "font-medium uppercase text-h1",
  h2: "font-medium uppercase text-h2",
  h3: "font-medium uppercase text-h3",
  h4: "font-medium text-h4",
  h5: "font-medium uppercase text-h5",
  h6: "font-medium text-h6",
  bodyL: "font-normal text-body-l",
  bodyM: "font-normal text-body-m",
  bodyS: "font-normal text-body-s",
  caption: "font-normal text-caption",
  button: "font-medium text-button",
} as const;

export type TypographyStyle = keyof typeof typography;
