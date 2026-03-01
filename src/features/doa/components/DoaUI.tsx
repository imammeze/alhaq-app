import { ChevronRightIcon } from "lucide-react";

interface HeroCardProps {
  bg: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export function HeroCard({ bg, icon, title, subtitle }: HeroCardProps) {
  return (
    <div
      className={`${bg} rounded-2xl p-4 text-white h-32 flex flex-col justify-between`}>
      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-sm">{title}</h3>
        <p className="text-[10px] opacity-80">{subtitle}</p>
      </div>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  color: string;
}

export function MenuItem({
  icon: Icon,
  title,
  subtitle,
  color,
}: MenuItemProps) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:border-emerald-500 transition-colors">
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>
      <ChevronRightIcon className="w-5 h-5 text-gray-300" />
    </div>
  );
}

interface CollectionItemProps {
  icon: React.ElementType;
  title: string;
  count: string;
  onClick?: () => void;
}

export function CollectionItem({
  icon: Icon,
  title,
  count,
  onClick,
}: CollectionItemProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:border-emerald-500 transition-colors active:scale-[0.99]">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
          <p className="text-xs text-gray-400">{count}</p>
        </div>
      </div>
      <ChevronRightIcon className="w-5 h-5 text-gray-300" />
    </div>
  );
}
