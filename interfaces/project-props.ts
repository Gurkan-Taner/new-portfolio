import { ReactElement } from "react";

export default interface ProjectProps {
  projects: ReadonlyArray<{
    readonly image: string;
    readonly video: string;
    readonly title: string;
    readonly description: string;
    readonly technologies: ReadonlyArray<string>;
    readonly href: string;
    readonly active: boolean;
    readonly dates: string;
    readonly links?: ReadonlyArray<{
      readonly type: string;
      readonly href: string;
      readonly icon: string | ReactElement;
    }>;
  }>;
}

