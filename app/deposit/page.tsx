"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WalletAddressDisplay } from "@/components/deposit-withdraw/wallet-address-display"
import { QRCode } from "@/components/deposit-withdraw/qr-code"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"

interface DepositHistory {
  id: string
  amount: number
  date: string
  status: "pending" | "confirming" | "confirmed"
  transactionId: string
  confirmations: number
}

// Mock data
const mockDepositHistory: DepositHistory[] = [
  {
    id: "1",
    amount: 500,
    date: "2025-11-10",
    status: "confirmed",
    transactionId: "0x1234...5678",
    confirmations: 12,
  },
  {
    id: "2",
    amount: 250,
    date: "2025-11-08",
    status: "confirmed",
    transactionId: "0x9876...4321",
    confirmations: 15,
  },
  {
    id: "3",
    amount: 1000,
    date: "2025-11-05",
    status: "confirmed",
    transactionId: "0x5555...6666",
    confirmations: 18,
  },
]

export default function DepositPage() {
  const [txId, setTxId] = useState("")
  const [showTxForm, setShowTxForm] = useState(false)
  const [confirmationSubmitted, setConfirmationSubmitted] = useState(false)

  const mockWalletAddress = "0x1234567890abcdef1234567890abcdef12345678"

  const handleSubmitTxId = async () => {
    if (!txId.trim()) return
    // TODO: Submit transaction ID to API for verification
    setConfirmationSubmitted(true)
    setTimeout(() => {
      setShowTxForm(false)
      setTxId("")
      setConfirmationSubmitted(false)
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
      case "confirming":
        return <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400 animate-spin" />
      case "pending":
        return <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmed"
      case "confirming":
        return "Confirming"
      case "pending":
        return "Pending"
      default:
        return ""
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Deposit Funds</h1>
            <p className="text-foreground/60">Send BEP-20 tokens to your wallet address to add funds</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Deposit Instructions */}
            <div>
              <div className="glass p-6 rounded-xl mb-6">
                <h2 className="text-xl font-semibold mb-4">Send Funds to This Address</h2>
                <p className="text-sm text-foreground/70 mb-4">
                  Send USDT or other BEP-20 tokens to this address. Your funds will be credited after network
                  confirmations.
                </p>

                <WalletAddressDisplay address={mockWalletAddress} />

                <div className="mt-6 space-y-3">
                  <div className="p-3 bg-info/10 border border-info/30 rounded-lg">
                    <p className="text-sm text-foreground/70">
                      <span className="font-medium">Minimum Deposit:</span> 10 USDT
                    </p>
                  </div>
                  <div className="p-3 bg-warning/10 border border-warning/30 rounded-lg">
                    <p className="text-sm text-foreground/70">
                      <span className="font-medium">Network:</span> BSC (BEP-20)
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg">
                    <p className="text-sm text-foreground/70">
                      <span className="font-medium">Confirmations:</span> 3 required
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass p-6 rounded-xl">
                <h3 className="font-semibold mb-4">Deposit Steps</h3>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                      1
                    </span>
                    <span className="text-foreground/70">Copy the wallet address above</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                      2
                    </span>
                    <span className="text-foreground/70">Open your wallet and send USDT (BEP-20)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                      3
                    </span>
                    <span className="text-foreground/70">Wait for network confirmations (usually 1-5 min)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                      4
                    </span>
                    <span className="text-foreground/70">Funds will appear in your balance</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* QR Code */}
            <div>
              <div className="glass p-8 rounded-xl sticky top-20">
                <h3 className="font-semibold mb-6 text-center">Scan to Send</h3>
                <QRCode address={mockWalletAddress} size={220} />
                <p className="text-xs text-foreground/60 text-center mt-6">Scan with your mobile wallet app</p>
              </div>
            </div>
          </div>

          {/* Confirm Transaction */}
          <div className="glass p-6 rounded-xl mb-12">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold">Confirm Manual Transaction</h3>
              <Button onClick={() => setShowTxForm(!showTxForm)} variant="outline" size="sm" className="rounded-lg">
                {showTxForm ? "Hide" : "Have Transaction ID?"}
              </Button>
            </div>

            {showTxForm && (
              <div className="space-y-4 p-4 bg-card/50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium mb-2">Transaction ID (Hash)</label>
                  <Input
                    type="text"
                    placeholder="0x..."
                    value={txId}
                    onChange={(e) => setTxId(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowTxForm(false)}
                    variant="outline"
                    className="flex-1 rounded-lg"
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmitTxId}
                    disabled={!txId.trim()}
                    className="flex-1 bg-primary hover:bg-primary/90 rounded-lg"
                    size="sm"
                  >
                    {confirmationSubmitted ? "Submitted..." : "Submit Transaction"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Deposit History */}
          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-6">Deposit History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">Transaction</th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">Confirmations</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDepositHistory.map((deposit) => (
                    <tr key={deposit.id} className="border-b border-border/10 hover:bg-card/30 transition-colors">
                      <td className="py-3 px-4">{deposit.date}</td>
                      <td className="py-3 px-4 font-semibold">${deposit.amount}</td>
                      <td className="py-3 px-4 font-mono text-xs text-foreground/70">{deposit.transactionId}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(deposit.status)}
                          <span className="text-foreground/70">{getStatusLabel(deposit.status)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{deposit.confirmations}/3</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
