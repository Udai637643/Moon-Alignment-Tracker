export interface MoonData {
  timestamp: string;
  location: string;
  moonAngle: number;
  visibility: number;
  alignedLocations?: string[];
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
} 