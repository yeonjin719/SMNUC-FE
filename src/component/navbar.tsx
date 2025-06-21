import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full min-h-[80px] flex items-center px-8">
            <div className="flex justify-between w-full">
                <div
                    className="text-black font-bold text-2xl hover:cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    SMNUC
                </div>
                <div className="flex gap-6">
                    <div
                        onClick={() => navigate('/building')}
                        className="hover:cursor-pointer"
                    >
                        건물 별 조회
                    </div>
                    <div
                        onClick={() => navigate('/search')}
                        className="hover:cursor-pointer"
                    >
                        검색
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
