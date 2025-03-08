import BaseButton from './BaseButton';

const ShowtimeButton = ({ showtime, isSelected, onClick }) => {
  return (
    <BaseButton isSelected={isSelected} onClick={onClick}>
      {showtime.time}
    </BaseButton>
  );
};

export default ShowtimeButton;