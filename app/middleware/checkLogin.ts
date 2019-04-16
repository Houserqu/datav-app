export default async function checkLogin(ctx, next) {
  if (!ctx.helper.getUserId()) {
    ctx.status = 401
    ctx.body = {
      success: false,
      msg: "请登录",
      data: ""
    }

    return
  }
  await next()
}
