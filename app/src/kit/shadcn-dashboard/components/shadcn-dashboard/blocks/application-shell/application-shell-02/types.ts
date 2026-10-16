export type NoteColor =
  | "primary"
  | "destructive"
  | "chart-2"
  | "chart-3"
  | "chart-4";

export type Note = {
  id: number;
  title: string;
  color: NoteColor;
  datef: string;
};

export type ColorOption = {
  id: number;
  lineColor: NoteColor;
  disp: NoteColor;
};

export const colorOptions: ColorOption[] = [
  { id: 1, lineColor: "chart-4", disp: "chart-4" },
  { id: 2, lineColor: "primary", disp: "primary" },
  { id: 3, lineColor: "destructive", disp: "destructive" },
  { id: 4, lineColor: "chart-2", disp: "chart-2" },
  { id: 5, lineColor: "chart-3", disp: "chart-3" },
];
