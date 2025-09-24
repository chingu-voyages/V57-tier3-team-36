// components/insightsBar/cards/cardWrapper.tsx
interface CardWrapperProps {
  title: string;
  children: React.ReactNode;
}

export default function CardWrapper({ title, children }: CardWrapperProps) {
  return (
    <div className="
      card 
      w-[240px] 
      h-[140px] 
      bg-white 
      border 
      border-gray-300 
      rounded-lg 
      shadow-md 
      hover:shadow-lg 
      transition-shadow 
      flex 
      flex-col
      p-3"
    >
      <div className="
        font-bold 
        text-gray-800 
        text-sm 
        mb-2 
        text-center"
      >
        {title}
      </div>
      <div className="
        flex-1 
        flex 
        bg-gray-100 
        border-gray-300 
        rounded-lg 
        items-center 
        justify-center 
        text-lg 
        text-gray-700"
      >
        {children}
      </div>
    </div>
  );
}
