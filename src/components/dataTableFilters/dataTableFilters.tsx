import Select from '@mui/material/Select';
import { Button, InputLabel, MenuItem, FormControl, Box, Stack, Checkbox } from '@mui/material';
import { ReactNode } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

type FilterProps = {
  list: any[];
  label: string | ReactNode;
  multiple: boolean;
  inputName: string;
  inputValue: string;
  value: any;
  handleChange: (e: any) => void;
};
type DataTableFiltersProps = {
  filters: FilterProps[];
  handleFilterClick: () => void;
  handleFilerClear: () => void;
};
export default function DataTableFilters({
  filters,
  handleFilterClick,
  handleFilerClear
}: DataTableFiltersProps) {
  return (
    <div>
      <Stack direction={{ xs: 'column', sm: 'row' }}>
        {filters?.map((filter: FilterProps, i: number) => {
          return (
            <FormControl
              key={i}
              variant="filled"
              sx={{
                m: 2,
                width: { xs: '92%', sm: 170 }
              }}
            >
              <InputLabel id="select"> {filter.label} </InputLabel>
              <Select
                labelId="select"
                id="slectBox"
                value={filter.value ? filter.value : ''}
                onChange={(e) => filter.handleChange(e?.target?.value)}
                MenuProps={MenuProps}
                multiple={filter.multiple}
                renderValue={(selected: any) =>
                  filter.multiple
                    ? selected.map((item: any, i: number) => (
                        <span key={i}>
                          {item[`${filter?.inputName}`]} {i !== selected.length - 1 ? ',' : ''}{' '}
                        </span>
                      ))
                    : selected[`${filter?.inputName}`]
                }
              >
                {!filter.multiple && (
                  <MenuItem value="">
                    <em>الكل</em>
                  </MenuItem>
                )}
                {filter.list?.map((item: any) => {
                  return (
                    <MenuItem value={item} key={item[`${filter?.inputValue}`]}>
                      {filter.multiple && <Checkbox checked={filter.value.indexOf(item) > -1} />}
                      <em>{`${item[`${filter?.inputName}`]}`}</em>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          );
        })}

        <Box>
          <Button variant="contained" onClick={handleFilterClick} sx={{ mx: 1, my: 3.5 }}>
            فلترة
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              filters?.map((filter: FilterProps) =>
                filter?.multiple ? filter?.handleChange([]) : filter?.handleChange('')
              );
              handleFilerClear && handleFilerClear();
            }}
            sx={{ mx: 1, my: 3.5 }}
          >
            حذف الفلتر
          </Button>
        </Box>
      </Stack>
    </div>
  );
}
