import { PiWifiX } from "react-icons/pi";

export const WIPScreen: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
           <PiWifiX size={50}/>
           <p>work in progress</p>
        </div>
    );
}
