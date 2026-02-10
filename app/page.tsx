import { auth0 } from './lib/auth0';

export default async function Page() {
  const session = await auth0.getSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {session?.user ? (
        <div className="flex flex-col items-center gap-y-4 text-center">
          <h1 className="text-3xl font-bold">Welcome</h1>
          {session.user.name && <p className="text-xl">{session.user.name}</p>}
          {session.user.picture && (
            <img 
              src={session.user.picture} 
              alt={session.user.name || 'User picture'} 
              className="h-24 w-24 rounded-full" 
            />
          )}
          {session.user.email && <p className="text-gray-500">{session.user.email}</p>}
          
          <a 
            href="/api/auth/logout" 
            className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Logout
          </a>

          <details className="mt-4 w-full max-w-lg">
            <summary className="cursor-pointer">User Profile Data</summary>
            <pre className="mt-2 w-full overflow-auto rounded-md bg-gray-100 p-4 text-left text-sm">
              {JSON.stringify(session.user, null, 2)}
            </pre>
          </details>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-y-4">
          <h1 className="text-3xl font-bold">Please log in to continue</h1>
          <div className="flex gap-x-4">
            <a 
              href="/api/auth/login" 
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Login
            </a>
            <a 
              href="/api/auth/login?screen_hint=signup" 
              className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
