type Props = {
    color: string;
    text: string;
    onClick: () => void;
}

const Button: React.FC<Props> = ({color, text, onClick}) => {
    return (
        <button
          onClick={onClick}   
          style={{backgroundColor: color}} 
          className='btn'>{text}</button>
    )
}

export default Button
