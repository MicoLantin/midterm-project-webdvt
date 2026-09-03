export default function Panel({ as: Tag = 'div', className = '', ...props }) {
  return <Tag className={`panel ${className}`.trim()} {...props} />;
}
