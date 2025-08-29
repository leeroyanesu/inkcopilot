import * as React from "react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  amount: number
}

interface InvoiceProps {
  invoiceNumber: string
  date: string
  dueDate: string
  clientDetails: {
    name: string
    email: string
    address?: string
  }
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  status: string
}

export function Invoice({ 
  invoiceNumber, 
  date, 
  dueDate, 
  clientDetails, 
  items, 
  subtotal, 
  tax, 
  total,
  status 
}: InvoiceProps) {
  const invoiceRef = useRef<HTMLDivElement>(null)

  const handlePrint = async () => {
    if (!invoiceRef.current) return;

    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: invoiceRef.current.scrollWidth,
        windowHeight: invoiceRef.current.scrollHeight
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
      pdf.save(`Invoice-${invoiceNumber}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    }
  }

  return (
    <div className="flex flex-col max-h-[80vh]">
      <div className="flex justify-between items-center mb-6 px-6 pt-6 no-print">
        <h2 className="text-2xl font-semibold text-gray-900">Invoice</h2>
        <Button 
          onClick={handlePrint}
          variant="outline"
          className="hover:bg-primary/10 relative"
        >
          <Download className="mr-2 h-4 w-4" />
          <span className="text-gray-900">Export as PDF</span>
        </Button>
      </div>
      
      <div className="overflow-y-auto px-6 pb-6">
        <div ref={invoiceRef} className="bg-white p-8 rounded-lg border shadow-sm">
          {/* Company Header */}
          <div className="flex justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src="/logo.svg" alt="InkCopilot" className="h-10 w-10" />
                <h1 className="text-2xl font-bold text-gray-900">InkCopilot</h1>
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                <p>123 Tech Valley</p>
                <p>San Francisco, CA 94105</p>
                <p>United States</p>
                <p className="mt-2 text-primary">support@inkcopilot.com</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-bold text-primary mb-2">INVOICE</h2>
              <div className="text-sm space-y-1">
                <div className="font-medium text-gray-900">#{invoiceNumber}</div>
                <div className="flex items-center justify-end gap-2 mt-2">
                  <span className="text-gray-900">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    status.toLowerCase() === 'paid' 
                      ? 'bg-green-50 text-green-700' 
                      : status.toLowerCase() === 'pending'
                      ? 'bg-yellow-50 text-yellow-700'
                      : status.toLowerCase() === 'overdue'
                      ? 'bg-red-50 text-red-700'
                      : 'bg-gray-50 text-gray-900'
                  }`}>
                    {status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dates & Client Info */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-sm text-gray-900 font-semibold mb-3">Bill To</h3>
              <div className="bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                <div className="space-y-2">
                  <p className="font-medium text-base text-gray-900">{clientDetails.name}</p>
                  <p className="text-sm text-muted-foreground">{clientDetails.email}</p>
                  {clientDetails.address && (
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {clientDetails.address}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm text-gray-900 font-semibold mb-3">Invoice Details</h3>
              <div className="bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Issue Date:</span>
                    <span className="font-medium text-gray-900">{date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span className="font-medium text-gray-900">{dueDate}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-muted-foreground">Payment Terms:</span>
                    <span className="font-medium text-gray-900">Net 30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mt-8">
            <div className="bg-gray-50/50 rounded-lg overflow-hidden border border-gray-100">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100/70 text-sm">
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">Qty</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">Unit Price</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {items.map((item, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="px-4 py-4 text-gray-900">{item.description}</td>
                      <td className="px-4 py-4 text-right text-gray-900">{item.quantity}</td>
                      <td className="px-4 py-4 text-right text-gray-900">
                        ${item.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-right font-medium text-gray-900">
                        ${item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="mt-8">
            <div className="flex justify-end">
              <div className="w-80 bg-primary/5 rounded-lg p-4 border border-primary/10">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-primary/10 my-2" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-primary">Total</span>
                    <span className="font-semibold text-lg text-primary">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="mt-12 border-t border-gray-100 pt-8">
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <div className="text-gray-900 font-medium mb-2">Notes:</div>
                <p className="text-sm text-gray-900">
                  Payment is due within 30 days. Please include invoice number on your check or wire transfer.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="text-center space-y-2">
              <p className="text-sm text-primary font-medium">
                Thank you for your business!
              </p>
              <p className="text-xs text-gray-500">
                If you have any questions about this invoice, please contact
              </p>
              <p className="text-xs font-medium text-gray-900">
                support@inkcopilot.com | +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
