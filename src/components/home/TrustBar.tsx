import { Clock, Package, Shield, Star } from "lucide-react";

const metrics = [
  { icon: Clock, value: "3.8 hrs", label: "Avg. Home Arrival" },
  { icon: Package, value: "100%", label: "Equipment Available" },
  { icon: Shield, value: "Verified", label: "Police & Background" },
  { icon: Star, value: "4.8 ★", label: "Patient Rating" },
];

export default function TrustBar() {
  return (
    <div className="trust-bar py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-4 md:divide-x md:divide-white/10">
          {metrics.map(({ icon: Icon, value, label }, i) => (
            <div
              key={label}
              className={`flex items-center gap-3 justify-center md:pl-4 first:md:pl-0 ${
                i % 2 === 0 ? "border-r border-white/10 md:border-none" : ""
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-bold text-sm md:text-base leading-none truncate">{value}</p>
                <p className="text-blue-200 text-[10px] md:text-xs mt-1 leading-tight">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
