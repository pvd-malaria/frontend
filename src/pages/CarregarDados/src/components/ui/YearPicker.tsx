import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface YearPickerProps {
  setSelectedYear: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedYear?: number;
  disabled: boolean;
}

const YearPicker = ({ setSelectedYear, selectedYear, disabled }: YearPickerProps) => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 30;
  const years = Array.from({ length: 31 }, (_, index) => startYear + index);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(year);
  };
 
  return (
    <div>
      <label
        htmlFor="yearSelect"
        style={{
          fontSize: "1.1rem",
          fontWeight: "600",
          color: "RGBA(0, 0, 0, 0.65)",
        }}
      >
        {/* Ano:{" "} */}
      </label>
      <DatePicker
      disabled={disabled}
        selected={ selectedYear ? new Date(selectedYear, 0, 1) : undefined}
        onChange={(Date) =>
          Date === null ? undefined :
          setSelectedYear(  parseInt(Date.getFullYear().toString(), 10)
            )
        }
        customInput={ <button 
          style={{
            //custom input
            
            backgroundColor: //check if is selected
            selectedYear && !disabled
             ? "#2754a8" : //error
            "#f5f5f5",
            color:  //check if is selected
            selectedYear && !disabled ? "#f5f5f5" : //error
            "#333",
            
          
  padding: "10px 20px",
  border: selectedYear && !disabled ? "none" :
   "2px solid #ccc",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
            
          }}
          type="button"
          className="btn btn-outline-primary"
        >
          {selectedYear ? selectedYear : "Selecione um ano"}
        </button>}
        showYearPicker
        dateFormat="yyyy"
        yearItemNumber={9}
      />
      {/* <select
        id="yearSelect"
        value={selectedYear || ""}
        onChange={handleYearChange}
        style={{
          padding: "0.5rem",
          borderRadius: "0.5rem",
          border: "1px solid #ccc",
          cursor: "pointer",
          //center
          textAlign: "center",
          //custom font
          fontFamily: "Roboto, sans-serif",
          fontSize: "1rem",
          fontWeight: "400",
          color: "RGBA(0, 0, 0, 0.65)",
        }}
      >
        <option value="">Selecione</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select> */}
    </div>
  );
};

export default YearPicker;
