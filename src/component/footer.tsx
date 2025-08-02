export const Footer = () => {
    return (
        <div className="border-t-1 border-gray-200 w-full min-h-[60px] flex mt-auto items-center justify-between px-[30px]">
            <div className="text-gray-600">
                Copyright © 2025 Cotton. <br /> All rights reserved.
            </div>
            <a
                href="mailto:kyj0719@gmail.com"
                className="text-gray-600 hover:cursor-pointer whitespace-nowrap"
            >
                문의하기
            </a>
        </div>
    );
};
