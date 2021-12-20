export type Param = Array<
  string | number | boolean | undefined | null | Record<string, unknown | Param>
>;

declare const clsx: (...params: Param) => string;
