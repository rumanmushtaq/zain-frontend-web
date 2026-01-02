"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"

interface WithdrawalHistory {
  id: string
  amount: number
  date: string
  status: "pending" | "processing" | "completed"
  address: string
  txId?: string
}

// Mock data
const mockWithdrawalHistory: WithdrawalHistory[] = [
  {
    id: "1",
    amount: 200,
    date: "2025-11-09",
    status: "completed",
    address: "0xabcd...ef01",
    txId: "0x1111...2222",
  },
  {
    id: "2",
    amount: 150,
    date: "2025-11-06",
    status: "completed",
    address: "0xefgh...ij23",
    txId: "0x3333...4444",
  },
]

const mockSavedAddresses = [
  { id: "1", label: "My Main Wallet", address: "0xabcd1234abcd1234abcd1234abcd1234abcd1234" },
  { id: "2", label: "Exchange Wallet", address: "0xefgh5678efgh5678efgh5678efgh5678efgh5678" },
]

export default function WithdrawPage() {
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [selectedAddress, setSelectedAddress] = useState(mockSavedAddresses[0].id)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [newAddress, setNewAddress] = useState("")
  const [newLabel, setNewLabel] = useState("")

  const availableBalance = 3450.23
  const withdrawalFee = withdrawAmount ? (Number.parseFloat(withdrawAmount) * 0.01).toFixed(2) : "0"
  const netAmount = withdrawAmount
    ? (Number.parseFloat(withdrawAmount) - Number.parseFloat(withdrawalFee)).toFixed(2)
    : "0"

  const handleWithdraw = async () => {
    if (!withdrawAmount || !selectedAddress) return

    setIsSubmitting(true)
    // TODO: Submit withdrawal to API
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setWithdrawAmount("")
    setIsSubmitting(false)
  }

  const handleAddAddress = async () => {
    if (!newAddress || !newLabel) return
    // TODO: Save new address to API
    setNewAddress("")
    setNewLabel("")
    setShowAddressForm(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
      case "processing":
        return <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400 animate-spin" />
      case "pending":
        return <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "processing":
        return "Processing"
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
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Withdraw Funds</h1>
            <p className="text-foreground/60">Withdraw your earnings to your BEP-20 wallet</p>
          </div>

          {/* Withdrawal Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="glass p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-6">Withdrawal Details</h2>

                {/* Available Balance */}
                <div className="mb-6 p-4 bg-card/50 rounded-lg border border-border/20">
                  <p className="text-sm text-foreground/60 mb-1">Available Balance</p>
                  <p className="text-3xl font-bold text-primary">${availableBalance.toFixed(2)}</p>
                </div>

                {/* Amount Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Withdrawal Amount</label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full pr-12"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/70">USDT</span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Button
                      onClick={() => setWithdrawAmount(String(availableBalance * 0.25))}
                      variant="outline"
                      size="sm"
                      className="text-xs rounded-lg"
                    >
                      25%
                    </Button>
                    <Button
                      onClick={() => setWithdrawAmount(String(availableBalance * 0.5))}
                      variant="outline"
                      size="sm"
                      className="text-xs rounded-lg"
                    >
                      50%
                    </Button>
                    <Button
                      onClick={() => setWithdrawAmount(String(availableBalance * 0.75))}
                      variant="outline"
                      size="sm"
                      className="text-xs rounded-lg"
                    >
                      75%
                    </Button>
                    <Button
                      onClick={() => setWithdrawAmount(String(availableBalance))}
                      variant="outline"
                      size="sm"
                      className="text-xs rounded-lg"
                    >
                      Max
                    </Button>
                  </div>
                </div>

                {/* Address Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium">Select Recipient Address</label>
                    <Button
                      onClick={() => setShowAddressForm(!showAddressForm)}
                      variant="outline"
                      size="sm"
                      className="text-xs rounded-lg"
                    >
                      + Add Address
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {mockSavedAddresses.map((addr) => (
                      <label
                        key={addr.id}
                        className="flex items-center gap-3 p-3 border border-border/20 rounded-lg hover:bg-card/50 cursor-pointer transition-colors"
                      >
                        <input
                          type="radio"
                          name="address"
                          value={addr.id}
                          checked={selectedAddress === addr.id}
                          onChange={(e) => setSelectedAddress(e.target.value)}
                          className="w-4 h-4 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-sm">{addr.label}</p>
                          <p className="text-xs text-foreground/60 font-mono">{addr.address}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Add Address Form */}
                {showAddressForm && (
                  <div className="mb-6 p-4 bg-card/50 rounded-lg border border-border/20 space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Label (e.g., "My Wallet")</label>
                      <Input
                        type="text"
                        placeholder="Enter a name for this address"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">BEP-20 Address</label>
                      <Input
                        type="text"
                        placeholder="0x..."
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setShowAddressForm(false)}
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-lg"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddAddress}
                        disabled={!newAddress || !newLabel}
                        className="flex-1 bg-primary hover:bg-primary/90 rounded-lg"
                        size="sm"
                      >
                        Save Address
                      </Button>
                    </div>
                  </div>
                )}

                {/* Summary */}
                {withdrawAmount && (
                  <div className="mb-6 space-y-2 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/70">Amount:</span>
                      <span className="font-medium">${withdrawAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/70">Network Fee (1%):</span>
                      <span className="font-medium">-${withdrawalFee}</span>
                    </div>
                    <div className="border-t border-primary/20 pt-2 flex justify-between text-sm">
                      <span className="font-medium">You receive:</span>
                      <span className="font-bold text-primary">${netAmount}</span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleWithdraw}
                  disabled={!withdrawAmount || !selectedAddress || isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 rounded-lg"
                >
                  {isSubmitting ? "Processing..." : "Withdraw Now"}
                </Button>
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-4">
              <div className="glass p-4 rounded-xl">
                <h3 className="font-semibold mb-3">Withdrawal Info</h3>
                <div className="space-y-2 text-sm text-foreground/70">
                  <p>
                    <span className="font-medium block text-foreground mb-1">Minimum:</span>
                    $10 USDT
                  </p>
                  <p>
                    <span className="font-medium block text-foreground mb-1">Maximum:</span>
                    {availableBalance} USDT
                  </p>
                  <p>
                    <span className="font-medium block text-foreground mb-1">Network Fee:</span>
                    1% of amount
                  </p>
                  <p>
                    <span className="font-medium block text-foreground mb-1">Processing Time:</span>
                    1-5 minutes
                  </p>
                </div>
              </div>

              <div className="glass p-4 rounded-xl bg-info/5 border border-info/20">
                <p className="text-sm text-foreground/70">
                  Withdrawals are processed automatically. Check your wallet within a few minutes.
                </p>
              </div>
            </div>
          </div>

          {/* Withdrawal History */}
          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-6">Withdrawal History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">Address</th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">Transaction</th>
                  </tr>
                </thead>
                <tbody>
                  {mockWithdrawalHistory.map((withdrawal) => (
                    <tr key={withdrawal.id} className="border-b border-border/10 hover:bg-card/30 transition-colors">
                      <td className="py-3 px-4">{withdrawal.date}</td>
                      <td className="py-3 px-4 font-semibold">${withdrawal.amount}</td>
                      <td className="py-3 px-4 font-mono text-xs text-foreground/70">{withdrawal.address}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(withdrawal.status)}
                          <span className="text-foreground/70">{getStatusLabel(withdrawal.status)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-foreground/70">{withdrawal.txId || "-"}</td>
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
