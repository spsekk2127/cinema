import BaseButton from './BaseButton';

const ShowtimeButton = ({ showtime, isSelected, onClick }) => {
  return (
    <BaseButton isSelected={isSelected} onClick={onClick}>
      <div className="flex flex-col items-center">
        <div className="text-sm">{showtime.date}</div>
        <div className="font-medium">{showtime.startTime}</div>
      </div>
    </BaseButton>
  );
};

export default ShowtimeButton;