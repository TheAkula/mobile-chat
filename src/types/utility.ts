export type DeepPartial<T> = T extends Array<any>
  ? {
      [P in keyof T]: DeepPartial<T[P]>;
    }
  : T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]> | undefined;
    }
  : T;
