export type StepType = "user-input" | "assistant-text" | "tool-use" | "todo" | "human-feedback";

export interface UserInputStep {
  type: "user-input";
  text: string;
}

export interface AssistantTextStep {
  type: "assistant-text";
  text: string;
}

export interface ToolUseStep {
  type: "tool-use";
  tool: string;
  args: string;
  result?: string;
}

export interface TodoItem {
  text: string;
  checked?: boolean;
}

export interface TodoStep {
  type: "todo";
  items: TodoItem[];
}

export interface HumanFeedbackStep {
  type: "human-feedback";
  text: string;
}

export type Step = UserInputStep | AssistantTextStep | ToolUseStep | TodoStep | HumanFeedbackStep;
