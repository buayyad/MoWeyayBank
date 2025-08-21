import instance from ".";

export type Transaction = {
  id: string | number;
  type: "deposit" | "withdraw" | "transfer";
  amount: number;
  createdAt: string;
};

export const deposit = async (amount: number) => {
  const res = await instance.put("/transactions/deposit", { amount });
  return res.data;
};

export const withdraw = async (amount: number) => {
  const res = await instance.put("/transactions/withdraw", { amount });
  return res.data;
};

export const transactions = async (): Promise<Transaction[]> => {
  const res = await instance.get("/transactions/my");
  return res.data;
};
