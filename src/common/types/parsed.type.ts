export type ParsedQueryType = {
  q?: string;
  select?:
    | {
        [index: string]: boolean;
      }
    | string[];
  relation?:
    | {
        [index: string]: boolean;
      }
    | string[];
  sort?: {
    [index: string]: 'ASC' | 'DESC';
  };
  filter?: {
    [index: string]: string;
  };
  limit?: number;
  page?: number;
};

export type QueryType = {
  q?: string;
  select?: string;
  with?: string;
  sort?: string;
  limit?: string;
  skip?: string;
  [index: string]: string | undefined;
};
