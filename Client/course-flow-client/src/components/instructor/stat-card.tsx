export const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  delta?: string;
}> = ({ title, value, icon, delta }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">{title}</span>
          <span className="text-2xl font-semibold text-gray-900">{value}</span>
        </div>
        <div className="flex flex-col items-end">
          <div className="p-2 bg-green-50 rounded-lg text-green-600">
            {icon}
          </div>
          {delta && (
            <span className="text-sm text-green-500 mt-2">{delta}</span>
          )}
        </div>
      </div>
    </div>
  );
};
