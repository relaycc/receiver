import React from "react";

export interface ReceiverProps {
  label: string;
}

const Receiver = (props: ReceiverProps) => {
  return <button>{props.label}</button>;
};

export default Receiver;
