import { useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-[60px] min-h-[60px] flex items-center px-8">
            <div className="flex justify-between w-full">
                <div
                    className="text-black font-bold text-2xl hover:cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    SMNUC
                </div>
                <div className="flex gap-6 items-center">
                    <div
                        onClick={() => navigate('/building')}
                        className="hover:cursor-pointer"
                    >
                        건물 별 조회
                    </div>
                    <IoSearch
                        className="hover:cursor-pointer"
                        size={20}
                        onClick={() => navigate('/search')}
                    ></IoSearch>
                </div>
            </div>
        </div>
    );
};
export default Navbar;
