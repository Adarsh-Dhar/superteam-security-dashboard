import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { RemediationAction } from "@/types"

interface RemediationTableProps {
  data: RemediationAction[]
}

export function RemediationTable({ data }: RemediationTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Action</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.action}</TableCell>
            <TableCell>
              <Badge variant={item.status === "Complete" ? "default" : "destructive"}>{item.status}</Badge>
            </TableCell>
            <TableCell>{item.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
