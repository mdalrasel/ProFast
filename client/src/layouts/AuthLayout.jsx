import authimg from '../assets/authImage.png'
import { Outlet } from 'react-router';
import ProFastLogo from '../pages/shered/ProFastLogo';

const AuthLayout = () => {
    return (
        <div className="p-12 w-11/12 bg-base-200 ">
            <div>
                <ProFastLogo />
            </div>
            <div className="flex flex-col lg:flex-row-reverse justify-center">
                <img
                    src={authimg}
                    className="max-w-sm rounded-lg  shadow-2xl flex-1"
                />
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;