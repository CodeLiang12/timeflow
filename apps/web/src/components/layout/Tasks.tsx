import TaskItem from "@/components/ui/TaskItem";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/stores/hooks";
import emptyTask from "@/assets/empty-task.svg";
import { useRef, useState } from "react";
import { Modal } from "antd";
import AddTaskFrom, { AddTaskFormRef } from "@/components/ui/AddTaskForm";

export default function Sidebar() {
  const [isShowAddTaskModal, setIsShowAddTaskModal] = useState(false);
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const formRef = useRef<AddTaskFormRef>(null);

  const handleAddTask = () => {
    setIsShowAddTaskModal(true);
  };

  const handleAddTaskOk = async () => {
    try {
      const values = await formRef.current?.getFormValues();
      console.log("add task", values);
      setIsShowAddTaskModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTaskCancel = () => {
    setIsShowAddTaskModal(false);
  };

  return (
    <div className="w-[300px] bg-white pt-[20px] border-r flex flex-col">
      <div className="w-full flex justify-between px-[20px] items-center pb-[10px]">
        <p className="text-xl font-bold">任务列表</p>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddTask}
        >
          新建
        </Button>
      </div>
      <div className="w-full px-[20px] flex-1 overflow-y-auto">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
          />
        ))}
        {tasks.length === 0 && <img src={emptyTask}></img>}
      </div>
      <Modal
        title="新建任务"
        cancelText="取消"
        okText="确定"
        open={isShowAddTaskModal}
        onOk={handleAddTaskOk}
        onCancel={handleAddTaskCancel}
      >
        <AddTaskFrom ref={formRef} />
      </Modal>
    </div>
  );
}
