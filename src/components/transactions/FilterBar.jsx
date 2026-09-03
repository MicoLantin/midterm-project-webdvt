import { CATEGORIES } from '../../utils/categories';

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
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
