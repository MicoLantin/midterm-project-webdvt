import { useState } from 'react';
import { CATEGORIES } from '../../utils/categories';

function validate(values) {
  const errors = {};
  if (!values.description.trim()) errors.description = 'description is required';

  const amountNum = Number(values.amount);
  if (values.amount === '' || Number.isNaN(amountNum) || amountNum <= 0) {
    errors.amount = 'enter an amount greater than 0';
  }

  if (!values.category) errors.category = 'pick a category';
  if (!values.date) errors.date = 'pick a date';

  return errors;
}

export default function TransactionForm({ initialValues, submitLabel, onSubmit }) {
  const [values, setValues] = useState(() => ({
    description: initialValues?.description ?? '',
    amount: initialValues?.amount ?? '',
    type: initialValues?.type ?? 'expense',
    category: initialValues?.category ?? CATEGORIES[0],
    date: initialValues?.date ?? new Date().toISOString().slice(0, 10),
  }));
  const [errors, setErrors] = useState({});

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSubmit({ ...values, amount: Number(values.amount) });
  }

  return (
    <form className="tx-form" onSubmit={handleSubmit} noValidate>
      <label className="field">
        <span>description</span>
        <input type="text" value={values.description} onChange={(e) => handleChange('description', e.target.value)} />
        {errors.description && <span className="field__error">{errors.description}</span>}
      </label>

      <div className="field-row">
        <label className="field">
          <span>type</span>
          <select value={values.type} onChange={(e) => handleChange('type', e.target.value)}>
            <option value="expense">expense</option>
            <option value="income">income</option>
          </select>
        </label>

        <label className="field">
          <span>amount (₱)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={values.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
          />
          {errors.amount && <span className="field__error">{errors.amount}</span>}
        </label>
      </div>

      <div className="field-row">
        <label className="field">
          <span>category</span>
          <select value={values.category} onChange={(e) => handleChange('category', e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>date</span>
          <input type="date" value={values.date} onChange={(e) => handleChange('date', e.target.value)} />
          {errors.date && <span className="field__error">{errors.date}</span>}
        </label>
      </div>

      <button type="submit" className="btn btn--primary">
        {submitLabel}
      </button>
    </form>
  );
}
