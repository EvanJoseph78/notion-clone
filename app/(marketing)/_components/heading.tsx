"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Suas ideias, documentos e muito mais em um só lugar. Bem-vind ao <span className="underline">
          Emerald</span>
      </h1>

      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Emerald está disponível de qualquer lugar! <br /> Rápido e seguro!
      </h3>

      <Button variant="emerald">Entre agora <ArrowRight className="h-4 w-4 ml-2"></ArrowRight></Button>
    </div>
  )
}
