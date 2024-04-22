export type UserType = {
  name: string;
  _id: string;
  number: string;
  email: string;
  balance: number;
  verified: boolean;
  parents: string[];
  transactions: any[];
  products: string[];
  children: {
    level1: { _id: string; valid: boolean }[];
    level2: { _id: string; valid: boolean }[];
    level3: { _id: string; valid: boolean }[];
    level4: { _id: string; valid: boolean }[];
    level5: { _id: string; valid: boolean }[];
  };
};
