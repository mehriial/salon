"use client"

import { useState } from "react"
import { DataTable } from "@/components/app/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown } from "lucide-react"
import { useTranslation } from "@/context/TranslationContext"

const columns = [
    {
        accessorKey: "paymantId",
        header: "PaymentId",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "paymentMode",
        header: "Payment Mode",
    },
]

const data = [
    {
        date: "2025-05-01",
        paymantId: "PMT123456",
        paymentMode: "Credit Card",
        amount: 150.75,
    },
    {
        date: "2025-05-10",
        paymantId: "PMT123457",
        paymentMode: "Cash",
        amount: 80.00,
    },
    {
        date: "2025-05-15",
        paymantId: "PMT123458",
        paymentMode: "Bank Transfer",
        amount: 200.50,
    },
    {
        date: "2025-05-20",
        paymantId: "PMT123459",
        paymentMode: "PayPal",
        amount: 60.00,
    },
];


export default function Transaction() {
    const [filtering, setFiltering] = useState("")
    const { translate } = useTranslation()

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <Input
                    placeholder="Search..."
                    value={filtering}
                    onChange={(e) => setFiltering(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            <DataTable
                columns={columns}
                data={data}
                filtering={filtering}
                setFiltering={setFiltering}
            />
        </>
    )
}
