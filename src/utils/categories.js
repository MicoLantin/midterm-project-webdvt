export const EXPENSE_CATEGORIES = ['Food', 'Transportation', 'Load', 'Bills', 'Entertainment', 'Shopping', 'Other'];

export const INCOME_CATEGORIES = ['Allowance', 'Savings'];

// Union of both lists, for places that filter/group across all transactions
// regardless of type (e.g. the dashboard's category filter, when "all
// types" is selected).
export const CATEGORIES = [...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES])];

// Categories applicable to a given transaction type. Anything other than
// 'income' or 'expense' (e.g. 'all') returns every category.
export function categoriesFor(type) {
  if (type === 'income') return INCOME_CATEGORIES;
  if (type === 'expense') return EXPENSE_CATEGORIES;
  return CATEGORIES;
}
