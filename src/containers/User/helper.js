export function handleAppType(appType) {
  let type = '未知'
  if (appType === 1) {
    type = 'Ios'
  } else if (appType === 2) {
    type = 'Android'
  } else if (appType === 3) {
    type = 'Web'
  }
  return type
}

export function handleAppRole(roleId) {
  let role = '未知'
  if (roleId === 1) {
    role = 'Admin'
  } else if (roleId === 2) {
    role = 'User'
  }
  return role
}