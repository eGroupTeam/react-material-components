export type Focused = 'start' | 'end';

export type DateRange = [Date | undefined, Date | undefined];

export type Touched = {
  start: boolean;
  end: boolean;
};

export type Setter<T> =
  | React.Dispatch<React.SetStateAction<T>>
  | ((value: T) => void);

export enum NavigationAction {
  Previous = -1,
  Next = 1
}

export type Falsy = false | null | undefined | 0 | '';

export type Marker = symbol;
