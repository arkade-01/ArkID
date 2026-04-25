interface StatCard {
  icon?: string;
  label: string;
  value: string;
}

const StatCard = ({ label, value }: StatCard) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-6">
      <h2 className="text-[40px] font-bold leading-none text-[#1E2A3A]">{value}</h2>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#717D96]">
        {label}
      </p>
    </div>
  );
};

export default StatCard;
