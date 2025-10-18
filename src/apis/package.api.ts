import type { Packages, PackageConfig } from '~/types/package.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'
const packageApi = {
  getVehiclePackage() {
    return http.get<SuccessResponse<Packages>>('/api/service/packages?product_type=vehicle')
  },
  getBatteryPackage() {
    return http.get<SuccessResponse<Packages>>('/api/service/packages?product_type=battery')
  },
  getCheckoutPackage(params: PackageConfig) {
    return http.get<SuccessResponse<Packages>>('/api/service/packages', { params })
  }
}

export default packageApi
