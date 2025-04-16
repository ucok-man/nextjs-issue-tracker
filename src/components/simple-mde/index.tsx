"use client";

import { Options } from "easymde";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export type SimpleMDEOptions = Options;

type Props = React.ComponentProps<typeof SimpleMdeReact>;

export default function SimpleMDE(props: Props) {
  return <SimpleMdeReact {...props} />;
}
