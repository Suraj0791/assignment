export type GoalType = 
  | "iphone"
  | "laptop"
  | "camera"
  | "bike"
  | "trip"
  | "food"
  | "savings"
  | "ps5";

export interface Goal {
  type: GoalType;
  amount: number;
  title: string;
  icon: string;
  description: string;
}

export interface Group {
  name: string;
  members: string[];
  targetAmount: number;
  contributionPerMember: number;
}

