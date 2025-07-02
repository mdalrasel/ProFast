import { Player,Controls } from '@lottiefiles/react-lottie-player';
import { Outlet } from 'react-router';
import ProFastLogo from '../pages/shered/ProFastLogo';
import animationData from '../../public/animations/login.json'
const AuthLayout = () => {

    return (
        <div className="p-12 w-11/12 bg-base-200 ">
            <div>
                <ProFastLogo />
            </div>
            <div className="flex flex-col lg:flex-row-reverse gap-5 justify-center items-center">
                <div className='flex-1'>
                    <Player
                    autoplay
                    loop
                    src={animationData} 
                    style={{ height: '300px', width: '300px' }}
                >
                    <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
                </Player>
                </div>
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;