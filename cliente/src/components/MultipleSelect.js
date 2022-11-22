import React, { useMemo } from "react";
import Select from "react-select";

export const Multipleselect = ({
  options,
  setState,
  defaultOption,
  value,
  disabled,
}) => {
  const optionsGeneric = useMemo(
    () =>
      options.map((e) => {
        return { value: e.idCompetencia, label: e.nombre };
      }),
    [options]
  );

  const onDropdownChange = (value) => {
    setState(value);
  };

  return (
    <div>
      <Select
        isMulti
        value={value}
        // value={selectedOptions}
        options={optionsGeneric}
        // onChange={handleSelect}
        onChange={onDropdownChange}
        placeholder={defaultOption}
        defaultValue={optionsGeneric[0]}
        isSearchable={true}
        closeMenuOnSelect={false}
        isDisabled={disabled === true ? true : false}
      />
    </div>
  );
};
