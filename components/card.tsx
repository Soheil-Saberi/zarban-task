import { forwardRef, HTMLAttributes } from "react";

import { classNames } from "@/lib/utils";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={classNames(
        "bg-card rounded border border-gray-200",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={classNames(
        "flex items-center justify-between rounded-t border-b border-gray-200 bg-[#fafafa] p-4 text-center",
        className,
      )}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={classNames("px-4 py-6 lg:px-6 lg:py-7", className)}
      {...props}
    />
  ),
);
CardBody.displayName = "CardBody";

export { Card, CardBody, CardHeader };
