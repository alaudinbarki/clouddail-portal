import React, { useState } from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Popover,
    Typography,
    Stack,
} from '@mui/material';
import {
    CalendarTodayOutlined,
    TodayOutlined,
    DateRangeOutlined,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { startOfDay, endOfDay, subDays, subMonths, subYears, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import type { DateRange, DateRangePreset } from '../../types/dashboard';

interface DateRangeFilterProps {
    value: DateRange;
    onChange: (range: DateRange) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ value, onChange }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [tempStartDate, setTempStartDate] = useState<Date>(value.startDate);
    const [tempEndDate, setTempEndDate] = useState<Date>(value.endDate);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePresetClick = (preset: DateRangePreset) => {
        const now = new Date();
        let startDate: Date;
        let endDate: Date = endOfDay(now);

        switch (preset) {
            case 'today':
                startDate = startOfDay(now);
                break;
            case 'week':
                startDate = startOfWeek(now);
                endDate = endOfWeek(now);
                break;
            case 'month':
                startDate = startOfMonth(now);
                endDate = endOfMonth(now);
                break;
            case 'quarter':
                startDate = subMonths(startOfMonth(now), 3);
                break;
            case 'year':
                startDate = startOfYear(now);
                endDate = endOfYear(now);
                break;
            default:
                return; // For custom, don't auto-set dates
        }

        onChange({ startDate, endDate, preset });
        if (preset !== 'custom') {
            handleClose();
        }
    };

    const handleApplyCustom = () => {
        onChange({
            startDate: tempStartDate,
            endDate: tempEndDate,
            preset: 'custom',
        });
        handleClose();
    };

    const getButtonLabel = () => {
        switch (value.preset) {
            case 'today':
                return 'Today';
            case 'week':
                return 'This Week';
            case 'month':
                return 'This Month';
            case 'quarter':
                return 'Last 3 Months';
            case 'year':
                return 'This Year';
            case 'custom':
                return 'Custom Range';
            default:
                return 'Select Range';
        }
    };

    const open = Boolean(anchorEl);

    return (
        <Box>
            <Button
                variant="outlined"
                startIcon={<CalendarTodayOutlined />}
                onClick={handleClick}
                sx={{ textTransform: 'none' }}
            >
                {getButtonLabel()}
            </Button>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ p: 2, minWidth: 320 }}>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        Select Date Range
                    </Typography>

                    {/* Quick Presets */}
                    <Stack spacing={1} sx={{ mb: 2 }}>
                        <ButtonGroup orientation="vertical" fullWidth>
                            <Button
                                startIcon={<TodayOutlined />}
                                onClick={() => handlePresetClick('today')}
                                variant={value.preset === 'today' ? 'contained' : 'outlined'}
                                sx={{ justifyContent: 'flex-start' }}
                            >
                                Today
                            </Button>
                            <Button
                                startIcon={<DateRangeOutlined />}
                                onClick={() => handlePresetClick('week')}
                                variant={value.preset === 'week' ? 'contained' : 'outlined'}
                                sx={{ justifyContent: 'flex-start' }}
                            >
                                This Week
                            </Button>
                            <Button
                                startIcon={<DateRangeOutlined />}
                                onClick={() => handlePresetClick('month')}
                                variant={value.preset === 'month' ? 'contained' : 'outlined'}
                                sx={{ justifyContent: 'flex-start' }}
                            >
                                This Month
                            </Button>
                            <Button
                                startIcon={<DateRangeOutlined />}
                                onClick={() => handlePresetClick('quarter')}
                                variant={value.preset === 'quarter' ? 'contained' : 'outlined'}
                                sx={{ justifyContent: 'flex-start' }}
                            >
                                Last 3 Months
                            </Button>
                            <Button
                                startIcon={<DateRangeOutlined />}
                                onClick={() => handlePresetClick('year')}
                                variant={value.preset === 'year' ? 'contained' : 'outlined'}
                                sx={{ justifyContent: 'flex-start' }}
                            >
                                This Year
                            </Button>
                        </ButtonGroup>
                    </Stack>

                    {/* Custom Date Range */}
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        Custom Range
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={2}>
                            <DatePicker
                                label="Start Date"
                                value={tempStartDate}
                                onChange={(date) => date && setTempStartDate(date)}
                                slotProps={{
                                    textField: { size: 'small', fullWidth: true },
                                }}
                            />
                            <DatePicker
                                label="End Date"
                                value={tempEndDate}
                                onChange={(date) => date && setTempEndDate(date)}
                                minDate={tempStartDate}
                                slotProps={{
                                    textField: { size: 'small', fullWidth: true },
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleApplyCustom}
                                fullWidth
                            >
                                Apply Custom Range
                            </Button>
                        </Stack>
                    </LocalizationProvider>
                </Box>
            </Popover>
        </Box>
    );
};

export default DateRangeFilter;
