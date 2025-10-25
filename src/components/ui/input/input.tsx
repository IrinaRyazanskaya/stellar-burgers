import type { ComponentProps, ForwardedRef } from "react";
import { forwardRef } from "react";
import { Input as BaseInput } from "@zlden/react-developer-burger-ui-components";

type InputProps = Omit<
  ComponentProps<typeof BaseInput>,
  "onPointerEnterCapture" | "onPointerLeaveCapture"
>;

const InputComponent = (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  // @ts-expect-error У базового инпута требуются лишние параметры
  return <BaseInput {...props} ref={ref} />;
};

const Input = forwardRef<HTMLInputElement, InputProps>(InputComponent);

Input.displayName = "Input";

export { Input };
export type { InputProps };
