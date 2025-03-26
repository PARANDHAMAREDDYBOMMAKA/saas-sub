import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-6 px-8 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">SaaS Platform</h1>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">Modern SaaS Solution</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Scale your business with our powerful subscription platform. Easy
              to integrate, flexible pricing, and powerful tools.
            </p>
            <Link
              href="/register"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white text-lg font-medium hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
        </section>

        <section className="py-16 px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Simple Integration",
                  description:
                    "Get up and running in minutes with our easy to use API",
                },
                {
                  title: "Subscription Management",
                  description:
                    "Powerful tools to manage and optimize your subscriptions",
                },
                {
                  title: "Analytics Dashboard",
                  description:
                    "Gain insights with detailed analytics and reporting",
                },
              ].map((feature, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-sm">
                  <h4 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="py-8 px-8 border-t">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} SaaS Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
