import Select from 'react-select';
import { isArray } from 'lodash';
import { CSSProperties, useState } from 'react';
import { Box } from '@mui/material';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

const customStyles = (
  menuStyles: CSSProperties | any,
  controleStyles: CSSProperties | any,
  singleValueStyles: CSSProperties | any,
  open = false
) => {
  return {
    menu: (provided: any) => ({
      ...provided,
      ...menuStyles
    }),

    control: (provided: any) => ({
      ...provided,
      boxShadow: `none`,
      // @ts-ignore
      '&:focus': {
        boxShadow: 'none'
      },
      '&:hover': {
        boxShadow: 'none'
      },
      border: ` ${open ? '1px solid #d49e24 !important' : 'auto'}`,
      ...controleStyles
    }),

    singleValue: (provided: any) => ({
      ...provided,
      ...singleValueStyles
    })
  };
};

type SelectProps = {
  onChange: any;
  className?: string;
  value: any;
  options?: any[];
  placeholder: string;
  isMulti?: boolean;
  menuStyles?: CSSProperties;
  controleStyles?: CSSProperties;
  singleValueStyles?: CSSProperties;
  containerStyles?: SxProps<Theme>;
  label?: string;
  valueName?: string;
};
const defaultValue = (options: any, value: any, valueName: string) => {
  return isArray(value)
    ? options?.filter(function (o1: any) {
        return value.some(function (o2: any) {
          return o1[`${valueName}`] === o2;
        });
      })
    : options?.find((option: any) => option.value === value) || null;
};
const ReactSelect = ({
  onChange,
  className,
  value,
  options,
  placeholder,
  isMulti,
  controleStyles,
  menuStyles,
  singleValueStyles,
  containerStyles,
  label,
  valueName
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Box
      className={className}
      sx={{
        ...containerStyles
      }}
    >
      <Select
        onChange={(value) => onChange(value)}
        value={defaultValue(options, value, valueName ? valueName : 'value')}
        options={options}
        getOptionLabel={(option) => (label ? option[`${label}`] : option?.label)}
        getOptionValue={(val) => (valueName ? val[`${valueName}`] : val)}
        placeholder={placeholder}
        onMenuOpen={() => {
          setOpen(true);
        }}
        onMenuClose={() => {
          setOpen(false);
        }}
        isMulti={isMulti}
        styles={customStyles(menuStyles || {}, controleStyles || {}, singleValueStyles || {}, open)}
      />
    </Box>
  );
};

export default ReactSelect;
