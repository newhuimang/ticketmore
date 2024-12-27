export interface EventDetails {
  startDate: string;
  endDate: string;
  venue: string;
  ageLimit: string;
  notice: string;
  discount: string | null;
  ticketTypes: Array<{
    type: string;
    price: number;
    description: string;
  }>;
  max: number;
}

export interface Status {
  open: boolean;
  early: boolean;
  soldOut: boolean;
}

export interface EventData {
  id: string;
  name: string;
  organizer: string;
  image: string;
  category: string;
  event: EventDetails;
  status: Status;
}

interface Event {
  id: string;
  image: string;
  name: string;
  startDate: string;
  endDate: string;
  alarm: boolean;
}

interface TimeSlot {
  events: Event[];
}

export interface TimelineProps {
  id: number;
  openDate: string;
  time: Record<string, TimeSlot>;
}

export interface Points {
  totalCount: number;
  lastUpdate: string;
  history: Array<{
    rewardSource?: string;
    usePoint?: string;
    update: string;
    balance: number;
    getReward: number | 0;
    useReward: number | 0;
  }>;
}

export interface UserVouchersList {
  totalCount: number;
  list: {
    availed: Array<{
      id: string;
      name: string;
      discountRate: number;
      createdDate: string;
      expiration: string | null;
      useDate: string | null;
      isActive: boolean;
    }>;
    used: Array<{
      id: string;
      name: string;
      discountRate: number;
      createdDate: string;
      expiration: string | null;
      useDate: string | null;
      isActive: boolean;
    }>;
  };
}

export interface UserBooking {
  id: string;
  seat_number: string;
  booking_date: string;
  isCancel: boolean;
  events: EventData;
}
interface UserPayments {
  type: "CARD" | "ACCOUNT";
  cardType?: "CREDIT" | "DEBIT";
  brand?: string;
  number?: string;
  expiration?: string;
  holder: string;
}

export interface UserMyInfo {
  id: string;
  points: Points;
  coupons: UserVouchersList;
  gifts: UserVouchersList;
  bookings: UserBooking[];
  payments: UserPayments[];
}
