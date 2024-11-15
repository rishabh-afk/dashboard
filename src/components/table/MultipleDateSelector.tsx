import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function ReferenceDateDefaultBehavior({
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}: {
  setStartDate?: any;
  setEndDate?: any;
  startDate?: any;
  endDate?: any;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex justify-center items-center gap-3">
        <DatePicker
          label="Start Date"
          className="w-1/2 p-[5px]"
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
            if (newValue && newValue.isAfter(endDate)) setEndDate(null);
          }}
          maxDate={dayjs()}
        />
        <DatePicker
          label="End Date"
          className="w-1/2"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          minDate={startDate ? startDate : undefined}
          maxDate={dayjs()}
        />
      </div>
    </LocalizationProvider>
  );
}
