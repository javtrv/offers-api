import usersData from '../data/users.json'
import offersData from '../data/offers.json'
import { User, type UserWithoutFavoriteOffers, Offer, type OfferId } from '../types'

const users: User[] = usersData as unknown as User[]
const offerts: Offer[] = offersData as unknown as Offer[]

export const getUsers = (): UserWithoutFavoriteOffers[] => {
  const usersWithoutFavoriteOffers = users.map((user) => {
    const { favoriteOffers, ...userWithoutFavoriteOffers } = user
    return userWithoutFavoriteOffers
  })
  return usersWithoutFavoriteOffers
}

export const getUserById = (id: string): User | undefined => {
  return users.find((user) => user.id === id)
}

export const getFavoriteOffersOfUser = (id: string, quantity: number): Offer[] | undefined => {
  const user = getUserById(id)
  if (user !== undefined) {
    const favoriteOffers = user?.favoriteOffers
    const offers = offerts.filter((offer) => favoriteOffers.includes(offer.id as unknown as OfferId))
    return offers.splice(0, quantity)
  } else {
    return undefined
  }
}

export const addFavoriteOfferToUser = (userId: string, offerId: string): User | undefined => {
  const user = getUserById(userId)
  if (user !== undefined) {
    const favoriteOffers = user.favoriteOffers
    if (favoriteOffers.includes(offerId as unknown as OfferId)) {
      return user
    } else {
      if (offerts.find((offer) => offer.id === offerId) == null) {
        return user
      }
      const updatedUser = {
        ...user,
        favoriteOffers: [...favoriteOffers, offerId as unknown as OfferId]
      }
      users[users.indexOf(user)] = updatedUser
      return updatedUser
    }
  } else {
    return undefined
  }
}

export const removeFavoriteOfferFromUser = (userId: string, offerId: string): User | undefined => {
  const user = getUserById(userId)
  if (user !== undefined) {
    const favoriteOffers = user.favoriteOffers
    if (!favoriteOffers.includes(offerId as unknown as OfferId)) {
      return user
    } else {
      if (offerts.find((offer) => offer.id === offerId) == null) {
        return user
      }
      const updatedUser = {
        ...user,
        favoriteOffers: favoriteOffers.filter((favoriteOffer) => favoriteOffer !== offerId as unknown as OfferId)
      }
      users[users.indexOf(user)] = updatedUser
      return updatedUser
    }
  } else {
    return undefined
  }
}

export const isFavoriteOfferOfUser = (userId: string, offerId: string): boolean => {
  const user = getUserById(userId)
  if (user !== undefined) {
    if (offerts.find((offer) => offer.id === offerId) == null) {
      return false
    }
    const favoriteOffers = user.favoriteOffers
    return favoriteOffers.includes(offerId as unknown as OfferId)
  } else {
    return false
  }
}
