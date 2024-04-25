import Image from "next/image";

export const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
        <Image
          src="/documents.svg"
          fill
          className="object-contain dark:hidden"
          alt="Documents"
        ></Image>

        <Image
          src="/documents-dark.svg"
          fill
          className="object-contain hidden dark:block"
          alt="Documents"
        ></Image>

      </div>
    </div>
  )
}
