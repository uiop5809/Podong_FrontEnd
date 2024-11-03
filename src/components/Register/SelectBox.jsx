import React from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowDown } from "react-icons/md";

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 13px 30px 13px 13px; 
  border: 1px solid #E4E4E4;
  border-radius: 5px;
  font-size: 11px;
  appearance: none; 
  margin-bottom: 8px;
  background-color: white;
  cursor: pointer;

  &:focus {
    border-color: #E4E4E4;
    outline: none;
  }
`;

const ArrowIcon = styled(MdKeyboardArrowDown)`
  position: absolute;
  right: 10px; 
  top: 40%;
  transform: translateY(-50%); 
  pointer-events: none; 
`;

const SelectBox = ({ options, value, onChange, placeholder, required }) => {
  return (
    <SelectContainer>
      <StyledSelect value={value || ""} onChange={onChange} required={required}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={option.id || index} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      <ArrowIcon />
    </SelectContainer>
  );
};

export default SelectBox;
