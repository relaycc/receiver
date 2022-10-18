export interface WrongTypeParseResult {
  status: 'wrong type';
  data: undefined;
  raw: unknown;
}

export interface InvalidJsonParseResult {
  status: 'invalid json';
  data: undefined;
  raw: unknown;
}

export interface UnknownFailureParseResult {
  status: 'unknown failure';
  data: undefined;
  raw: unknown;
}

export interface SuccessParseResult<T> {
  status: 'success';
  data: T;
  raw: unknown;
}

export type ParseResult<T> =
  | InvalidJsonParseResult
  | WrongTypeParseResult
  | UnknownFailureParseResult
  | SuccessParseResult<T>;

export const parseJson = <D>(
  json: unknown,
  validator: (d: unknown) => d is D
): ParseResult<D> => {
  try {
    let parsed;
    try {
      parsed = JSON.parse(json as string);
    } catch {
      parsed = undefined;
    }

    if (parsed === undefined) {
      return { status: 'invalid json', data: undefined, raw: json };
    } else if (!validator(parsed)) {
      return { status: 'wrong type', data: undefined, raw: json };
    } else {
      return { status: 'success', data: parsed, raw: json };
    }
  } catch {
    return { status: 'unknown failure', data: undefined, raw: json };
  }
};
