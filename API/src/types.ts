enum Provider {
  BankA = 'Bank A',
  BankB = 'Bank B',
  BankC = 'Bank C',
  BankD = 'Bank D',
  BankE = 'Bank E'
}

enum LoanType {
  PersonalLoan = 'Personal Loan',
  MortgageLoan = 'Mortgage Loan',
  StudentLoan = 'Student Loan'
}

export interface Offer {
  id: string
  loanType: LoanType
  amount: number
  interestRate: number
  term: number
  provider: Provider
  details?: string
}

export type OfferWithoutDetails = Omit<Offer, 'details'>

export type OfferId = Pick<Offer, 'id'>

export interface User {
  id: string
  name: string
  email: string
  favoriteOffers: OfferId[]
}

export type UserWithoutFavoriteOffers = Omit<User, 'favoriteOffers'>
