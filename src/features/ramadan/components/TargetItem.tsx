import { CheckIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { getIconComponent } from "../constants/icons";

interface TargetItemProps {
  iconId: string;
  title: string;
  subtitle: string;
  bg: string;
  color: string;
  isCompleted: boolean;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function TargetItem({
  iconId,
  title,
  subtitle,
  bg,
  color,
  isCompleted,
  onClick,
  onEdit,
  onDelete,
}: TargetItemProps) {
  const Icon = getIconComponent(iconId);

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-2xl border cursor-pointer transition-all active:scale-[0.98] flex items-center justify-between ${
        isCompleted
          ? "bg-emerald-50/50 border-emerald-200"
          : "bg-white border-gray-100 shadow-sm hover:border-emerald-100"
      }`}>
      <div className="flex items-center gap-4 flex-1">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
            isCompleted ? "bg-emerald-100 text-emerald-600" : `${bg} ${color}`
          }`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h4
            className={`font-bold text-sm ${
              isCompleted
                ? "text-emerald-800 line-through opacity-80"
                : "text-gray-800"
            }`}>
            {title}
          </h4>
          <p className="text-[10px] text-gray-400 mt-0.5">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {!isCompleted && (
          <div className="flex items-center gap-1 mr-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-1.5 text-gray-300 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors">
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2Icon className="w-4 h-4" />
            </button>
          </div>
        )}
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
            isCompleted
              ? "bg-emerald-500 border-none"
              : "border-2 border-gray-200"
          }`}>
          {isCompleted && <CheckIcon className="w-4 h-4 text-white" />}
        </div>
      </div>
    </div>
  );
}
