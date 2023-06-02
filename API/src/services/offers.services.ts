import offersData from '../data/offers.json'
import { Offer, type OfferWithoutDetails } from '../types'

const offers: Offer[] = offersData as Offer[]

export const getOffers = (): OfferWithoutDetails[] => {
  const offersWithoutDetails = offers.map((offer) => {
    const { details, ...offerWithoutDetails } = offer
    return offerWithoutDetails
  })
  return offersWithoutDetails
}

export const getOfferById = (id: string): Offer | undefined => {
  return offers.find((offer) => offer.id === id)
}
