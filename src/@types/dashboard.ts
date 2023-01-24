export type TotalAppointments = {
  total: number;
  appointments: { monthId: number; month: string; total: number; year: string }[];
};
