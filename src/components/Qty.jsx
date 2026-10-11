export default function Qty({ value, onChange, label }) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} aria-label="Decrease quantity">&minus;</button>
      <output aria-live="polite">{value}</output>
      <button type="button" onClick={() => onChange(Math.min(10, value + 1))} disabled={value >= 10} aria-label="Increase quantity">+</button>
    </div>
  )
}
