import BaseButton from '@/components/ui/BaseButton';

const TheaterButton = ({ theater, isSelected, onClick }) => {
    return(
        <BaseButton isSelected={isSelected} onClick={onClick}>
            {theater.name}
        </BaseButton>
    );
}

export default TheaterButton;
