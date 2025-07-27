import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DeFiCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: number;
  changePercent?: number;
  isNegative?: boolean;
  children?: React.ReactNode;
}

export const DeFiCard: React.FC<DeFiCardProps> = ({
  title,
  value,
  subtitle,
  change,
  changePercent,
  isNegative = false,
  children,
}) => (
  <Card className="bg-background border border-[#9945FF]/20">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div>
          <CardDescription className="text-gray-400">{title}</CardDescription>
          <CardTitle className="text-2xl mt-1 text-text">{value}</CardTitle>
        </div>
        {(change || changePercent) && (
          <div
            className={`flex items-center ${isNegative ? "text-red-500" : "text-[#14F195]"}`}
          >
            <span className="text-sm font-medium">
              {!isNegative && "+"}
              {change && `$${change.toLocaleString()}`}{" "}
              {changePercent && `(${changePercent}%)`}
            </span>
          </div>
        )}
      </div>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </CardHeader>
    <CardContent className="pt-0">{children}</CardContent>
  </Card>
);
