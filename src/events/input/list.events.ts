/* eslint-disable @typescript-eslint/no-inferrable-types */
export class ListEvents {
  when?: WhenEventFilter = WhenEventFilter.All;
  page: number = 1;
  perPage: number = 10;
}

export enum WhenEventFilter {
  All = 1,
  Today,
  Tomorrow,
  ThisWeek,
  NextWeek,
}
