/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
import React from 'react';

import { Box, Button, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';

export interface GuestFilterParams {
  platform: string,
  userAgent: string
}

interface GuestFilterProps {
  onFilterChange?: (value: GuestFilterParams) => void;
}

/**
 * Filter component that defines the available filters for the guest grid.
 */
export default function GuestFilter({
  onFilterChange = () => {},
}: GuestFilterProps) {
  const [filter, setFilter] = React.useState<GuestFilterParams>({ platform: '', userAgent: '' });

  const onPlatformChangeHandler = (event: SelectChangeEvent) => {
    const { value } = event.target;
    const newFilter = { ...filter, ...{ platform: value } };
    setFilter(newFilter);
    onFilterChange(newFilter);
  };

  const onBrowserChangeHandler = (event: SelectChangeEvent) => {
    const { value } = event.target;
    const newFilter = { ...filter, ...{ userAgent: value } };
    setFilter(newFilter);
    onFilterChange(newFilter);
  };

  const onResetHandler = () => {
    const newFilter: GuestFilterParams = { platform: '', userAgent: '' };
    setFilter(newFilter);
    onFilterChange(newFilter);
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'end'
    }}>
      <Button size="small" sx={{ marginBottom: '0.5rem' }} onClick={onResetHandler}>Reset Filter</Button>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="select-platform-label">Platform</InputLabel>
        <Select
          labelId="select-platform-label"
          id="select-platform"
          value={filter.platform}
          onChange={onPlatformChangeHandler}
          label="Platform"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="ios">iOS</MenuItem>
          <MenuItem value="android">Android</MenuItem>
          <MenuItem value="windows-phone">Windows Phone</MenuItem>
          <MenuItem value="desktop">Desktop</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="select-browser-label">Browser</InputLabel>
        <Select
          labelId="select-browser-label"
          id="select-browser"
          value={filter.userAgent}
          onChange={onBrowserChangeHandler}
          label="Browser"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="chrome">Chrome</MenuItem>
          <MenuItem value="edge">Edge</MenuItem>
          <MenuItem value="edge-chromium">Edge-Chromium</MenuItem>
          <MenuItem value="firefox">Firefox</MenuItem>
          <MenuItem value="ie">IE</MenuItem>
          <MenuItem value="ie11">IE 11</MenuItem>
          <MenuItem value="opera">Opera</MenuItem>
          <MenuItem value="safari">Safari</MenuItem>
          <MenuItem value="unknown-browser">Unknown</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}