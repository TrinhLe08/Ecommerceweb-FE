import { useEffect, useState } from 'react';

interface SplashScreenProps {
    finishLoading: () => void;
}

const SplashScreen = ({ finishLoading }: SplashScreenProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const isDarkMode = localStorage.getItem("theme") === "dark";

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(finishLoading, 500);
        }, 1500);

        return () => clearTimeout(timer);
    }, [finishLoading]);

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500 opacity-100 
    ${isDarkMode ? "bg-gray-900 text-white" : "bg-white"}`}>

            <div className="w-[200px] h-[200px]">
                <img
                    src="https://www.leifshop.com/cdn/shop/t/49/assets/logo_leif.png"
                    alt="Leifshop Logo"
                    className="w-[100%]"
                    style={{
                        filter: isDarkMode ? 'brightness(1000%)' : 'brightness(0)'
                    }}
                />
            </div>
        </div>
    );
};

export default SplashScreen;