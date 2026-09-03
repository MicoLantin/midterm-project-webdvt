export const EXPENSE_CATEGORIES = ['Food', 'Transportation', 'Load', 'Bills', 'Entertainment', 'Shopping', 'Other'];

export const INCOME_CATEGORIES = ['Allowance', 'Savings', 'Other'];

// Union of both lists, for places that filter/group across all transactions
// regardless of type (e.g. the dashboard's category filter).
export const CATEGORIES = [...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES])];
