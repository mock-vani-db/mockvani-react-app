import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Section with Brand Image */}
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Mock-Vani AI Interview"
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80" // Replace with your brand-relevant image
            className="absolute inset-0 h-full w-full object-cover opacity-80"
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

            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Welcome to Mock-Vani
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-gray-300">
              Your AI-powered mock interview platform. Practice, prepare, and excel in your career journey.
            </p>
          </div>
        </section>

        {/* Sign-in Section */}
        <main className="flex items-center justify-center px-8 py-12 sm:px-12 lg:col-span-7 xl:col-span-6 bg-gray-50">
          <div className="w-full max-w-md space-y-8">
            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
}
