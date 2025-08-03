import { useNavigate } from 'react-router-dom';
import SchoolImg from '../images/SangMyung.png';
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="flex gap-[40px] flex-col self-start justify-center items-center w-full">
            <div className="w-full flex justify-center items-center h-full bg-blue-50 relative">
                <img
                    src={SchoolImg}
                    alt="상명대학교 전경"
                    className="flex max-h-[60vh] object-cover max-w-[800px] m-auto justify-self-center items-self-center mask-fade-x"
                    style={{
                        WebkitMaskImage:
                            'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                        maskImage:
                            'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                    }}
                />
                <button
                    onClick={() => navigate('/search')}
                    className="z-[10] bg-[#f0f0f0] hover:cursor-pointer hover:bg-[#e1e1e1] bottom-[-30px] px-[60px] py-[15px] font-bold text-2xl absolute rounded-2xl shadow-[0_0_12px_rgba(0,0,0,0.3)]"
                >
                    빈 강의실 찾아보기
                </button>
            </div>
            <div className="flex w-full px-[30px] gap-[30px] justify-center">
                <div
                    onClick={() => alert('아직 제공하지 않는 기능이에요')}
                    className="bg-white shadow rounded-xl p-4 w-[300px] h-fit"
                >
                    강의실 대여 알아보기
                </div>
                <a
                    href="https://lib.smu.ac.kr/clicker/k"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white shadow rounded-xl p-4 w-[300px] h-fit"
                >
                    열람실/스터디룸 대여하러가기
                </a>
            </div>
        </div>
    );
};

export default Home;
