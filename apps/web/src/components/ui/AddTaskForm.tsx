import { Form, Input, DatePicker, Select } from "antd";
import { useImperativeHandle } from "react";
export interface AddTaskFormRef {
  getFormValues: () => Promise<any>;
  resetForm: () => void;
}

export interface AddTaskFormProps {
  ref: React.Ref<AddTaskFormRef>;
}

interface AddTaskFormState {
  title: string;
  description: string;
  time?: [Date, Date];
  priority: string;
  startTime: string;
  endTime: string;
}

const { TextArea } = Input;
const { RangePicker } = DatePicker;
export default function AddTaskForm({ ref }: AddTaskFormProps) {
  const [form] = Form.useForm<AddTaskFormState>();

  useImperativeHandle(ref, () => ({
    getFormValues: async () => {
      try {
        const values = await form.validateFields();
        if (values.time) {
          const [startTime, endTime] = values.time
          values.startTime = startTime.toISOString()
          values.endTime = endTime.toISOString()
        }
        delete values.time
        return values;
      } catch (error) {
        throw error;
      }
    },
    resetForm: () => {
      form.resetFields();
    },
  }));

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="my-[20px]"
      initialValues={{ priority: "high" }}
    >
      <Form.Item
        label="任务名称"
        name="title"
        rules={[{ required: true, message: "请输入任务名称" }]}
      >
        <Input placeholder="输入任务名称" />
      </Form.Item>
      <Form.Item
        label="描述"
        name="description"
      >
        <TextArea
          rows={3}
          placeholder="输入任务描述"
        />
      </Form.Item>
      <Form.Item
        label="任务时间"
        name="time"
        rules={[{ required: true, message: "请选择任务时间" }]}
      >
        <RangePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        label="任务优先级"
        name="priority"
        rules={[{ required: true, message: "请选择任务优先级" }]}
      >
        <Select
          // defaultValue="high"
          options={[
            { value: "high", label: "高优先级" },
            { value: "medium", label: "中优先级" },
            { value: "low", label: "低优先级" },
          ]}
        />
      </Form.Item>
      <p className="text-dangerColor text-xs mt-[-15px]">
        * 若要添加子任务可以添加完任务后点击该任务添加
      </p>
    </Form>
  );
}
