import { Link } from 'react-router';
import logo from '../../assets/logo.png'

const ProFastLogo = () => {
    return (
        <Link to='/' className='flex items-end '>
            <img className='mb-2' src={logo} alt="" />
            <p className='text-4xl font-extrabold font-mono -ml-2'>ProFast</p>
            
        </Link>
    );
};

export default ProFastLogo;