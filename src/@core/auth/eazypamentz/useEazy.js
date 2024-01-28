// ** JWT Service Import
import EazyService from './eazyService'

// ** Export Service as useJwt
export default function useEazy() {
  const eazy = new EazyService()

  return {
    eazy
  }
}
