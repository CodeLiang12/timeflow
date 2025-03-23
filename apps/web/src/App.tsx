import TopBar from "@/components/layout/Topbar";
import Tasks from "@/components/layout/Tasks";
import DataAnalysis from "@/components/layout/DataAnalysis";

export default function App() {
  return (
    <div className="w-full h-full flex flex-col">
      <TopBar />
      <div className="w-full max-w-[3840px] mx-auto flex-1 min-h-[900px] flex justify-between items-stretch">
        <Tasks />
        <DataAnalysis />
      </div>
    </div>
  );
}
