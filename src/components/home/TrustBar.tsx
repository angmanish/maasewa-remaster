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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-white/10">
          {metrics.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 justify-center pl-4 first:pl-0"
            >
              <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none">{value}</p>
                <p className="text-blue-200 text-xs mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
