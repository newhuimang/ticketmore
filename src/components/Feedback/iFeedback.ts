import { Dispatch, SetStateAction } from "react";

type FeedbackType = "alert" | "toast";

interface FeedbackMessageProps {
  message: { type: FeedbackType; options: FeedbackOptions } | null;
  setMessage: Dispatch<
    SetStateAction<{ type: FeedbackType; options: FeedbackOptions } | null>
  >;
}

interface FeedbackOptions {
  text: string;
  children?: React.ReactNode;
  okText?: string;
  handleOk?: (e: any) => void;
  cancelText?: string;
  handleCancel?: () => void;
  state?: "primary" | "error" | "default";
}

interface FeedbackContextType {
  alert: (options: FeedbackOptions) => void;
  toast: (options: FeedbackOptions) => void;
}

export type {
  FeedbackContextType,
  FeedbackOptions,
  FeedbackType,
  FeedbackMessageProps,
};
