import SchoolImg from '../images/SangMyung.png';
const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="w-full flex jusify-center items-center h-fit bg-blue-50">
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
            </div>
        </div>
    );
};

export default Home;
