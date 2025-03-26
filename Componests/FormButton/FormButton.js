import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react'
import { useAccount } from 'wagmi';


const FormButton = ({ onClick, href, disabled, buttonName }) => {
    const { isConnected } = useAccount();

    const getButtonStyle = () => {
        if (buttonName === 'Approve') return 'bg-red-500 hover:bg-red-600';
        if (buttonName === 'Previous') return 'bg-gray-500 hover:bg-gray-600';
        return 'bg-blue-500 hover:bg-blue-600';
    };

    return isConnected ? (
        href ? (
            
            <a
                href={href}
                className={`clbtn inline-block px-4 py-2 text-white font-medium rounded-md ${getButtonStyle()} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {buttonName}
            </a>
        ) : (
            <div className="lbtnbox">
            <button
                onClick={onClick}
                disabled={disabled}
                className={`clbtn px-4 py-2 text-white font-medium rounded-md ${getButtonStyle()} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {buttonName}
            </button>
            </div>
        )
    ) : (
        <ConnectButton />
    );
};

export default FormButton