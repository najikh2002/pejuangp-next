import { TitlePageProps } from "@/types/schema";

export default function TitlePage({ title, description }: TitlePageProps) {
  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5 border-b-[1px] border-gray-400">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        {title}
      </h1>
      {description && (
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
}
