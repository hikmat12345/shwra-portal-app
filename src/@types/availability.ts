export enum IDay {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday'
}


export type Day = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";


export type Interval = {
  from: string;
  to: string;
}


export type Rule = {
  dayId: string;
  intervals: Interval[];
};



export type AvailabilityState = {
  isLoading: boolean;
  isEditing: boolean;
  // isInitilized: boolean;
  isSynced: boolean;
  isChanged?: boolean;
  isOnline: boolean,
  error: boolean;
  rules: any;
  workDays: {
    id: string;
    name: string;
    isAvailabile: boolean;
  }[],
  workHours: string[],
  isOpenModal: boolean;
  selectedAvailabilityId: null | string;
  selectedRange: null | { start: Date; end: Date };
  categoriesList: any,
  lawyerAvailability: [] | null;
  availabilityStatus: any;
  overlapingError: boolean;
};


export type WeekEvent ={
  dayId?: string;
  end: string | Date;
  start: string | Date;
}