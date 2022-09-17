import { useSession, signIn, signOut } from "next-auth/react"
import { sendError } from "next/dist/server/api-utils"

import DataPage from "./DataPage"

export default () => {
  const { data: session } = useSession()

  console.log(session)

  if (session) {
    return <DataPage code={session.accessToken} />
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("spotify", { callbackUrl: "https://google.com" })}>Sign in</button>
    </>
  )
}