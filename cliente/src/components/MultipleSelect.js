import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";

export const Multipleselect = ({ options, setState, defaultOption }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const optionsGeneric = useMemo(
    () =>
      options.map((e) => {
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
  console.log(selectedOptions);
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
