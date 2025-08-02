import { useNavigate } from 'react-router-dom';
import SchoolImg from '../images/SangMyung.png';
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="w-full flex justify-center items-center h-fit bg-blue-50 relative">
                <img
                    src={SchoolImg}
                    alt="상명대학교 전경"
                    className="flex max-w-[800px] m-auto justify-self-center items-self-center mask-fade-x"
                    style={{
                        WebkitMaskImage:
                            'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                        maskImage:
                            'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                    }}
                />
                <button
                    onClick={() => navigate('/search')}
                    className="bg-white hover:cursor-pointer hover:bg-[#e1e1e1] px-[60px] py-[15px] font-bold text-2xl absolute bottom-[-35px] rounded-4xl shadow-xl"
                >
                    강의실 시간표 조회하기
                </button>
            </div>
        </div>
    );
};

export default Home;
