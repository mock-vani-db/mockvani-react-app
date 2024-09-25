import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Light Animated Patterns */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="pattern-dots absolute w-36 h-36 bg-blue-200 rounded-full opacity-20 animate-move-pattern"></div>
        <div className="pattern-dots absolute w-28 h-28 bg-indigo-200 rounded-full opacity-15 animate-move-pattern delay-1"></div>
        <div className="pattern-waves absolute w-48 h-48 bg-pink-100 rounded-full opacity-10 animate-waves delay-3"></div>
      </div>

      <div className="lg:grid lg:min-h-screen lg:grid-cols-12 relative z-10">
        {/* Left Section with Brand Image */}
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Mock-Vani AI Interview"
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80" // Replace with a brand-relevant image
            className="absolute inset-0 h-full w-full object-cover opacity-90 rounded-bl-3xl"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="/">
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194..."
                  fill="currentColor"
                />
              </svg>
            </a>

            <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Welcome to Mock Vani
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-gray-300">
              Your AI-powered mock interview platform. Practice, prepare, and excel in your career journey.
            </p>
          </div>
        </section>

        {/* Sign-in Section */}
        <main className="flex items-center justify-center px-8 py-12 sm:px-12 lg:col-span-7 xl:col-span-6 bg-gradient-to-br from-gray-50 to-white shadow-xl rounded-tl-3xl lg:rounded-none lg:rounded-tr-3xl">
          <div className="w-full max-w-md space-y-8">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              Sign In to Mock-Vani
            </h2>
            <SignIn />
          </div>
        </main>
      </div>
    </div>
  );
}
