import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, categoriesFor } from '../../utils/categories';

// When the type filter is narrowed to income or expense, the category list
// is already one coherent group. Only "all types" mixes both, so that's the
// only case that needs grouping to stay organized.
function CategoryOptions({ type }) {
  if (type === 'all') {
    return (
      <>
        <optgroup label="Expense">
          {EXPENSE_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </optgroup>
        <optgroup label="Income">
          {INCOME_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </optgroup>
      </>
    );
  }

  return categoriesFor(type).map((c) => (
    <option key={c} value={c}>
      {c}
    </option>
  ));
}

export default function FilterBar({ category, type, onCategoryChange, onTypeChange }) {
  return (
    <div className="filter-bar">
      <select value={type} onChange={(e) => onTypeChange(e.target.value)} aria-label="filter by type">
        <option value="all">all types</option>
        <option value="income">income</option>
        <option value="expense">expense</option>
      </select>
      <select value={category} onChange={(e) => onCategoryChange(e.target.value)} aria-label="filter by category">
        <option value="all">all categories</option>
        <CategoryOptions type={type} />
      </select>
    </div>
  );
}
