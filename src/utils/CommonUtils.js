export function createOption(key, value, label) {
    return (
      <option className="text-xs" key={key} value={value}>
        {label}
      </option>
    )
  }