import cookie from "cookie";

export default (_req: any, res: { setHeader: (arg0: string, arg1: string) => void; json: (arg0: { success: boolean; }) => any; }) => {
  
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("LOGIN_DATA", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    })
  );
  return res.json({ success: true });
};