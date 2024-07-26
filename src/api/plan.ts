// import { service } from './request'
import service from './request'

const createPlanParam = async (data: any) => {
  return service({
    url: `/api/plan/create/param`,
    method: 'POST',
    data: data,
  })
}

export {
  createPlanParam,
}
