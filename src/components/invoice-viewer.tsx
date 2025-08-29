import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Receipt } from "lucide-react"
import { Invoice } from "@/components/invoice"

interface InvoiceViewerProps {
  transaction: {
    id: string
    date: string
    amount: string
    status: string
    description: string
  }
}

export function InvoiceViewer({ transaction }: InvoiceViewerProps) {
  const generateInvoiceData = () => ({
    invoiceNumber: transaction.id,
    date: transaction.date,
    dueDate: transaction.date,
    clientDetails: {
      name: "John Doe",
      email: "john@example.com",
      address: "123 Business Avenue\nTech City, TC 12345"
    },
    items: [
      {
        description: transaction.description,
        quantity: 1,
        unitPrice: parseFloat(transaction.amount.replace('$', '')),
        amount: parseFloat(transaction.amount.replace('$', ''))
      }
    ],
    subtotal: parseFloat(transaction.amount.replace('$', '')),
    tax: 0,
    total: parseFloat(transaction.amount.replace('$', '')),
    status: transaction.status
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Receipt className="mr-2 h-4 w-4" />
          View Receipt
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <Invoice {...generateInvoiceData()} />
      </DialogContent>
    </Dialog>
  )
}
