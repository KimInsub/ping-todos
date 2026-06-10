export type StepType = "user-input" | "assistant-text" | "tool-use" | "todo" | "receiving-feedback" | "human-feedback";

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

export interface ReceivingFeedbackStep {
  type: "receiving-feedback";
}

export interface PingingHumansStep {
  type: "pinging-humans";
  workers: { name: string; color: string }[];
}

export interface HumanFeedbackStep {
  type: "human-feedback";
  items: string[];
}

export type Step = (
  | UserInputStep
  | AssistantTextStep
  | ToolUseStep
  | TodoStep
  | ReceivingFeedbackStep
  | PingingHumansStep
  | HumanFeedbackStep
) & {
  /** ms to hold after this step before auto-advancing (default 400) */
  holdAfter?: number;
};
