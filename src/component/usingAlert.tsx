const UsingAlert = ({ isUsing }: { isUsing: boolean }) => {
    return (
        <div>
            {isUsing ? (
                <div className="flex justify-center rounded-[15px] w-[100px] bg-red-200 py-1">
                    사용 중
                </div>
            ) : (
                <div className="flex justify-center rounded-[15px] w-[100px] bg-green-200 py-1">
                    비어 있음
                </div>
            )}
        </div>
    );
};
export default UsingAlert;
