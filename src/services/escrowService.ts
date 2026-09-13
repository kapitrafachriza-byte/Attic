// Attic Escrow & 24-Hour Buyer Inspection State Machine
// Implements PRD 7.3 (Escrow Protection & 24-hour Inspection Window)

export type EscrowStatus = 
  | "WAITING_PAYMENT"
  | "PAID_HELD"
  | "IN_TRANSIT"
  | "DELIVERED_INSPECTION"
  | "COMPLETED"
  | "DISPUTED"
  | "REFUNDED";

export interface EscrowFinancials {
  productPrice: number;
  platformFeeRate: number; // 0.05
  platformFeeAmount: number;
  logisticsFee: number;
  helperFee: number;
  deepCleanFee: number;
  escrowProtectionFee: number;
  totalBuyerPaid: number;
  netSellerPayout: number;
}

export interface DisputeArbitrationInput {
  disputeId: string;
  orderId: string;
  action: "FULL_REFUND_BUYER" | "RELEASE_TO_SELLER" | "PARTIAL_COMPENSATION";
  partialAmount?: number;
  adminNotes: string;
  arbitratedBy: string;
}

export class EscrowService {
  static readonly INSPECTION_WINDOW_HOURS = 24;
  static readonly ESCROW_PROTECTION_FEE = 25000;
  static readonly PLATFORM_COMMISSION_RATE = 0.05;

  /**
   * Calculates detailed breakdown of funds held in escrow
   */
  static calculateFinancials(params: {
    productPrice: number;
    logisticsFee: number;
    helperFee?: number;
    deepCleanFee?: number;
  }): EscrowFinancials {
    const helperFee = params.helperFee || 0;
    const deepCleanFee = params.deepCleanFee || 0;
    const platformFeeAmount = Math.round(params.productPrice * this.PLATFORM_COMMISSION_RATE);
    const netSellerPayout = params.productPrice - platformFeeAmount;
    const totalBuyerPaid =
      params.productPrice +
      params.logisticsFee +
      helperFee +
      deepCleanFee +
      this.ESCROW_PROTECTION_FEE;

    return {
      productPrice: params.productPrice,
      platformFeeRate: this.PLATFORM_COMMISSION_RATE,
      platformFeeAmount,
      logisticsFee: params.logisticsFee,
      helperFee,
      deepCleanFee,
      escrowProtectionFee: this.ESCROW_PROTECTION_FEE,
      totalBuyerPaid,
      netSellerPayout,
    };
  }

  /**
   * Generates the 24-hour inspection expiration timestamp from delivery time
   */
  static generateInspectionDeadline(deliveredAt: Date = new Date()): Date {
    const deadline = new Date(deliveredAt.getTime());
    deadline.setHours(deadline.getHours() + this.INSPECTION_WINDOW_HOURS);
    return deadline;
  }

  /**
   * Computes remaining inspection time for buyer before auto-release
   */
  static getRemainingInspectionTime(deadline: Date): {
    totalMs: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
    formatted: string;
  } {
    const now = Date.now();
    const diffMs = deadline.getTime() - now;

    if (diffMs <= 0) {
      return {
        totalMs: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
        formatted: "Waktu inspeksi 24 jam telah berakhir",
      };
    }

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return {
      totalMs: diffMs,
      hours,
      minutes,
      seconds,
      isExpired: false,
      formatted: `${hours} jam ${minutes} menit lagi`,
    };
  }

  /**
   * Determines if funds can be released to seller
   */
  static canReleaseFunds(order: {
    status: EscrowStatus;
    deliveredAt?: Date | null;
    inspectionDeadline?: Date | null;
  }): { canRelease: boolean; reason?: string } {
    if (order.status === "DISPUTED") {
      return {
        canRelease: false,
        reason: "Dana tertahan karena transaksi sedang dalam proses sengketa (Dispute Desk).",
      };
    }
    if (order.status === "COMPLETED") {
      return {
        canRelease: false,
        reason: "Dana sudah berhasil dicairkan ke saldo penjual.",
      };
    }
    if (order.status === "REFUNDED") {
      return {
        canRelease: false,
        reason: "Pesanan telah dibatalkan/dana dikembalikan ke pembeli.",
      };
    }
    if (order.status !== "DELIVERED_INSPECTION") {
      return {
        canRelease: false,
        reason: "Barang belum tiba atau status belum dalam tahap inspeksi pembeli.",
      };
    }

    return { canRelease: true };
  }

  /**
   * Processes dispute arbitration outcome
   */
  static processArbitration(
    financials: EscrowFinancials,
    arbitration: DisputeArbitrationInput
  ): {
    buyerRefundAmount: number;
    sellerPayoutAmount: number;
    platformRetainedAmount: number;
    status: EscrowStatus;
  } {
    switch (arbitration.action) {
      case "FULL_REFUND_BUYER":
        // Full product price and escrow fee refunded to buyer; logistics already consumed
        return {
          buyerRefundAmount: financials.productPrice + financials.escrowProtectionFee,
          sellerPayoutAmount: 0,
          platformRetainedAmount: 0,
          status: "REFUNDED",
        };

      case "PARTIAL_COMPENSATION":
        // Admin agrees on a partial compensation discount (e.g. for fixing minor repair)
        const partial = Math.min(arbitration.partialAmount || 0, financials.netSellerPayout);
        return {
          buyerRefundAmount: partial,
          sellerPayoutAmount: financials.netSellerPayout - partial,
          platformRetainedAmount: financials.platformFeeAmount,
          status: "COMPLETED",
        };

      case "RELEASE_TO_SELLER":
      default:
        // Dispute rejected (e.g. flaw was already clearly disclosed before purchase)
        return {
          buyerRefundAmount: 0,
          sellerPayoutAmount: financials.netSellerPayout,
          platformRetainedAmount: financials.platformFeeAmount,
          status: "COMPLETED",
        };
    }
  }
}
