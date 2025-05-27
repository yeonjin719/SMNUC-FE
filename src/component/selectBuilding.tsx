import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { BuildingNames, type BuildingType } from '../constants/building';
const optionClass =
    'cursor-pointer px-4 py-2 hover:bg-gray-100 transition-all border-b last:border-none';
type SelectBuildingProps = {
    setShow: (show: boolean) => void;
    show: boolean;
    building: BuildingType;
    setBuilding: (building: BuildingType) => void;
};
const SelectBuilding = ({
    setShow,
    show,
    building,
    setBuilding,
}: SelectBuildingProps) => {
    return (
        <div className="flex">
            <div
                onClick={() => setShow(!show)}
                className="relative border flex justify-center items-center w-[200px] h-[50px] rounded-md hover:cursor-pointer"
            >
                {building}
                {show ? (
                    <IoIosArrowUp className="absolute right-[20px]"></IoIosArrowUp>
                ) : (
                    <IoIosArrowDown className="absolute right-[20px]"></IoIosArrowDown>
                )}

                <div
                    className={`${
                        show
                            ? 'block absolute top-[50px] max-h-[400px] overflow-y-auto w-full bg-white border rounded-md shadow-lg'
                            : 'hidden'
                    }`}
                >
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.A as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.A}
                    </div>
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.B as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.B}
                    </div>
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.C as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.C}
                    </div>
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.D as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.D}
                    </div>
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.E as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.E}
                    </div>
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.F as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.F}
                    </div>
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.G as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.G}
                    </div>
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.H as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.H}
                    </div>
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.I as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.I}
                    </div>
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.J as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.J}
                    </div>
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.K as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.K}
                    </div>
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.L as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.L}
                    </div>
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.M as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.M}
                    </div>
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.N as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.N}
                    </div>
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.O as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.O}
                    </div>
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.R as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.R}
                    </div>
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.S as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.S}
                    </div>
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.T as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.T}
                    </div>
                    <div
                        onClick={() =>
                            setBuilding(BuildingNames.U as BuildingType)
                        }
                        className={optionClass}
                    >
                        {BuildingNames.U}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SelectBuilding;
