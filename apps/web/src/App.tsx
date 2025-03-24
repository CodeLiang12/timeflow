import TopBar from "@/components/layout/Topbar";
import Tasks from "@/components/layout/Tasks";
import DataAnalysis from "@/components/layout/DataAnalysis";
import Timeline from "./components/layout/Timeline";

export default function App() {
  return (
    <div className="w-full min-w-[1900px] h-full flex flex-col overflow-hidden">
      <TopBar />
      <div className="w-full max-w-[3840px] mx-auto flex-1 flex justify-between items-stretch overflow-hidden">
        <Tasks />
        <div className="flex-1 overflow-hidden flex flex-col">
          <Timeline />
        </div>
        <DataAnalysis />
      </div>
    </div>
  );
}
