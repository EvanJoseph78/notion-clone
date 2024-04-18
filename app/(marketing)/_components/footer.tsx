import { Button } from "@/components/ui/button"
import { Logo } from "./logo"

export const Footer = () => {
  return (
    <div className="flex items-center w-full p-6 bg-background z-50">
      <Logo></Logo>
      <div className="md:ml-auto w-full flex justify-between items-center gap-x-2 text-muted-foreground md:justify-end">
        <Button variant="ghost" size="sm">
          Politicas de privacidade
        </Button>
        <Button variant="ghost" size="sm">
          Termos e condições
        </Button>
      </div>
    </div>
  )
}
