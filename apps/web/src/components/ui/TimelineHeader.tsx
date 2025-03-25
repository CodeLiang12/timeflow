import { TimelineComponent } from "../layout/Timeline";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, DatePicker } from "antd";
import dayjs from "dayjs";

interface TimelineHeaderProps {
  type: TimelineComponent;
  setComponent: (type: TimelineComponent) => void;
  changeCurrent: (type: "left" | "right") => void;
}

export default function TimelineHeader({
  type,
  setComponent,
  changeCurrent
}: TimelineHeaderProps) {
  const options: { value: TimelineComponent; label: string }[] = [
    { value: "Day", label: "日" },
    { value: "Week", label: "周" },
    { value: "Month", label: "月" },
  ];

  const getSliderPosition = () => {
    switch (type) {
      case "Day":
        return "left-[6px]";
      case "Week":
        return "left-[56px]";
      case "Month":
        return "left-[106px]";
      default:
        return "left-[6px]";
    }
  };

  return (
    <div className="w-full bg-timelineBg flex justify-between items-center transition-all">
      <div className="w-[150px] bg-white h-[40px] flex justify-around items-center rounded relative cursor-pointer">
        {/* 滑块 */}
        <div
          className={`break-after-auto bg-primaryColor h-[30px] w-[38px] rounded absolute z-0 transition-all ${getSliderPosition()}`}
        ></div>

        {/* 选项按钮 */}
        {options.map((option) => (
          <div
            key={option.value}
            className={`z-10 w-[50px] text-center ${
              type === option.value && "text-white"
            }`}
            onClick={() => setComponent(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>

      {/* 时间 */}
      <div className="flex justify-end items-center transition-all">
        <Button
          icon={<LeftOutlined />}
          className="border-none mx-[25px]"
          onClick={() => changeCurrent('left')}
        ></Button>
        <DatePicker defaultValue={dayjs()} format={'YYYY年MM月DD日'} allowClear={ false } />
        <Button
          icon={<RightOutlined />}
          className="border-none mx-[25px]"
          onClick={() => changeCurrent('right')}
        ></Button>
        <Button
          type="primary"
          autoInsertSpace={false}
          onClick={() => setComponent("Day")}
          disabled={type === "Day"}
        >
          今天
        </Button>
      </div>
    </div>
  );
}
