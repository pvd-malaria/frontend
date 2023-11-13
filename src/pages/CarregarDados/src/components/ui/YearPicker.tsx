interface YearPickerProps {
  setSelectedYear: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedYear?: number;
}

const YearPicker = ({ setSelectedYear, selectedYear }: YearPickerProps) => {
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
        Ano:{" "}
      </label>
      <select
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
      </select>
    </div>
  );
};

export default YearPicker;
