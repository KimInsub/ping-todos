export type StepType = "user-input" | "assistant-text" | "tool-use";

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

export type Step = UserInputStep | AssistantTextStep | ToolUseStep;
