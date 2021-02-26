// import React, {useLocation} from 'react-router-dom';
import Button from './Button';

type Props = {
    title?: string;
    onAdd: () => void;
    showAdd: boolean;
}

const Header: React.FC<Props> = ({title, onAdd, showAdd}) => {
    // const location = useLocation();

    return (
        <header className='header'>
            <h1>{title}</h1>
            {/* { {location.pathname === '/' && ( */}
                <Button 
                color={showAdd ? 'red' : 'green'} 
                text={showAdd ? 'Close' : 'Add'} 
                onClick={onAdd} />
            {/* )} } */}
        </header>
    );
}

Header.defaultProps = {
    title: 'Task Tracker'
}

export default Header
