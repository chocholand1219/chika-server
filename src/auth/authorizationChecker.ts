import {Action} from 'routing-controllers'

export const authorizationChecker = (): ((
  action: Action,
  roles: any[]
) => Promise<boolean> | boolean) => {
  // const userService = Container.get<UserService>(UserService)
  // const authService = Container.get<AuthService>(AuthService)

  return async (action: Action): Promise<boolean> => {
    // const {email} = authService.parseFromRequest(action.request)

    // action.request.user = await userService.findOne({where: {email}})

    return Promise.resolve(true)
  }
}
