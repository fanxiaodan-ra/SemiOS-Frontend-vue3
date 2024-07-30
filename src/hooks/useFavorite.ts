import { favoriteActions, favoriteCancel } from '@/api/init'
import useAccount from '@/hooks/useAccount'
export default function useFavorite() {
  const { getTrading, getSig } = useAccount()
  const favoriteData = async (
    favoriteId: string | number,
    type: number,
    favorited: boolean
  ) => {
    const isTrad = await getTrading()
    if (!isTrad) return false
    const sig = await getSig()
    if (sig) {
      const query = {
        type: type,
        favoriteId: favoriteId,
      }
      const res = favorited
        ? await favoriteCancel(query)
        : await favoriteActions(query)
      if (res) {
        return {
          favoriteAmount: favorited ? -1 : 1,
          favorited: favorited ? false : true,
        }
      } else {
        return false
      }
    } else {
      return false
    }
  }

  return { favoriteData }
}
