/// <reference types="react" />
export declare type Focused = 'start' | 'end';
export declare type DateRange = [Date | undefined, Date | undefined];
export declare type Touched = {
  start: boolean;
  end: boolean;
};
export declare type Setter<T> =
  | React.Dispatch<React.SetStateAction<T>>
  | ((value: T) => void);
export declare enum NavigationAction {
  Previous = -1,
  Next = 1
}
export declare type Falsy = false | null | undefined | 0 | '';
export declare type Marker = symbol;
