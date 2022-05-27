import React from "react";

const Select = ({ data = null, dataTarget = null, onChange = null }) => {
  if (!data) {
    return null;
  }

  const items = Array.from(data, ([name, value]) => ({ name, value })).map((item, index) => {
    return <option key={ index } value={ item.value.id }>{ item.value.label } ({ item.value.symbol })</option>;
  })

  return (
    <select className="form-select"
            aria-label="Select currency"
            data-target={ dataTarget }
            onChange={ onChange }
    >
      { items }
    </select>
  );
}

export default Select;