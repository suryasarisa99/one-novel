type UserChildrenType = {
  _id: string;
  valid: boolean;
  name: String;
};

export type UserType = {
  name: string;
  _id: string;
  number: string;
  email: string;
  balance: number;
  verified: boolean;
  parents: string[];
  uploadUrl: string;
  uploadStatus: string;
  level: number;
  uploadedBooks: {
    status: string;
    url: string;
    date: string;
  }[];
  transactions: {
    _id: string;
    transaction_id: string;
    status: String;
    transaction_type: String;
    fromUser: string;
    amount: number;
    date: string;
    is_debit: boolean;
  }[];
  products: string[];
  bank: {
    bank_name: string;
    account_no: string;
    ifsc: string;
  };
  upi: string;
  withdrawlType: number;
  children: {
    level1: UserChildrenType[];
    level2: UserChildrenType[];
    level3: UserChildrenType[];
    level4: UserChildrenType[];
    level5: UserChildrenType[];
  };
};
