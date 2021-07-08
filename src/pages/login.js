import React from "react";

export default function Login() {
  return (
    <main className="max-w-screen-lg mx-auto h-screen flex justify-center items-center px-6 lg:px-0">
      <section className="p-4 border border-gray-primary shadow-md rounded w-full lg:w-1/3">
        <h2 className="text-2xl font-semibold my-4">Notework</h2>
        <form className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className="input" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="input" />

          <button type="submit" className="button">
            Login
          </button>
        </form>
      </section>
    </main>
  );
}
