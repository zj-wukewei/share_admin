import moment from 'moment'

export function handleListData(responseData) {
  const {data, loading, loaded} = responseData
  let total = 0, list = []
  if (data) {
    total = data.total
    list = data.list
  }
  return {total, list, loading, loaded}
}


export function handleDate(time) {
  return moment(time).format('YYYY-MM-DD HH:mm')
}

