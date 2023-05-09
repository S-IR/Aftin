export type SortOptionType = {
  name: string;
  imgSrc: `/${string}` | null;
  value:
    | string
    | { name: string; imgSrc: `/${string}` | null; value: string | null }[];
};

export type SortNestedOptionType = {
  name: string;
  imgSrc: `/${string}` | null;
  value: { name: string; imgSrc: `/${string}` | null; value: string | null }[];
};
