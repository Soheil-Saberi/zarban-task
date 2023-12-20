"use client";

import { useState } from "react";

import { Card, CardBody, CardHeader } from "@/components/card";

import StepOne from "./_component/step-one";
import StepTwo from "./_component/step-two";

interface StepType {
  label: string;
  description: string;
}

const StepItem: StepType[] = [
  {
    label: "Token Minting",
    description:
      "Mint tokens for your wallet address with specified amounts through a user-friendly form.",
  },
  {
    label: "Token Transfer",
    description:
      "Transfer minted tokens securely to any Ethereum address using a simple form interface.",
  },
];

export default function Home() {
  const [step, setStep] = useState<0 | 1>(0);

  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <Card className="max-w-[500px]">
        <CardHeader className="flex-col gap-2">
          <h2 className="text-xl font-bold">{StepItem[step].label}</h2>
          <p className="text-sm">{StepItem[step].description}</p>
        </CardHeader>
        <CardBody className="flex flex-col gap-8">
          {step === 0 ? <StepOne setStep={setStep} /> : <StepTwo />}
        </CardBody>
      </Card>
    </main>
  );
}
