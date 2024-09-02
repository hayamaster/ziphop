export interface SelectedDay {
  date: string;
  hour: number;
}

export interface UserSelection {
  selectedDays: SelectedDay[];
  nickname: string;
  uniqueId: string;
}

export interface MainEventData {
  title: string;
  created_at: string;
  days: string[];
  startTime: string;
  endTime: string;
  pageId: string;
  userSelections: UserSelection[];
}

export interface Years {
  [key: string]: {
    [key: string]: number[];
  };
}
