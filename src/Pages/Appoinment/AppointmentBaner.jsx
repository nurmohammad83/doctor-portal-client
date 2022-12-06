import chair from "../../assets/images/chair.png";
import { DayPicker } from "react-day-picker";

const AppointmentBaner = ({ selectedDate, setSelectedDate }) => {
  return (
    <div className="hero my-6">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={chair} alt="" className="max-w-sm rounded-lg shadow-2xl" />
        <div className="mr-6">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentBaner;
