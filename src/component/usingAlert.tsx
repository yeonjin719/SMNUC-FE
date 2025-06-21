const UsingAlert = ({ isUsing }: { isUsing: boolean }) => {
    return (
        <div>
            {isUsing ? (
                <div className="flex items-center justify-center rounded-[15px] w-[100px] gap-2 py-1 font-medium">
                    사용 중
                    <div className="w-[10px] h-[10px] rounded-[50%] bg-red-500"></div>
                </div>
            ) : (
                <div className="flex items-center justify-center rounded-[15px] w-[100px] gap-2 py-1 font-medium">
                    비어 있음
                    <div className="w-[10px] h-[10px] rounded-[50%] bg-green-500"></div>
                </div>
            )}
        </div>
    );
};
export default UsingAlert;
