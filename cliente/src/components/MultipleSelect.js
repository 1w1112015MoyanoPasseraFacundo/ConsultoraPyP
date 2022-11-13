import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";

export const Multipleselect = ({
  options,
  setState,
  defaultOption,
  values,
}) => {
  console.log("VALUES", values);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const optionsGeneric = useMemo(
    () =>
      options.map((e) => {
        console.log("E", e);
        return { value: e.idCompetencia, label: e.nombre };
      }),
    [options]
  );

  const handleSelect = (data) => {
    setSelectedOptions(data);
  };

  useEffect(() => {
    setState(selectedOptions.map((e) => e.value));
  }, [selectedOptions, setState]);

  useEffect(() => {
    setSelectedOptions([]);
  }, [options]);

  useEffect(() => {
    if (values !== undefined) {
      setSelectedOptions(values);
    }
  }, []);
  return (
    <div>
      <Select
        options={optionsGeneric}
        placeholder={defaultOption}
        value={selectedOptions}
        defaultValue={optionsGeneric[0]}
        onChange={handleSelect}
        isSearchable={true}
        isMulti
        closeMenuOnSelect={false}
      />
    </div>
  );
};
