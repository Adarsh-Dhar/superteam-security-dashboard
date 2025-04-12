import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FundFlow } from "@/types";

interface FundFlowTableProps {
  data: FundFlow[];
}

export function FundFlowTable({ data }: FundFlowTableProps) {
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Stolen': return 'destructive';
      case 'Traced': return 'default';
      case 'Frozen': return 'secondary';
      case 'Mixed': return 'outline';
      default: return null;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Blockchain</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.blockchain}</TableCell>
            <TableCell><span className="font-mono bg-slate-100 px-1 rounded text-sm">{item.from}</span></TableCell>
            <TableCell><span className="font-mono bg-slate-100 px-1 rounded text-sm">{item.to}</span></TableCell>
            <TableCell>{item.amount}</TableCell>
            <TableCell>
              <Badge variant={getBadgeVariant(item.status)}>{item.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
