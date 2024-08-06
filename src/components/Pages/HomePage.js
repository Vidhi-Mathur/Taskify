import { TypewriterText } from "../UI/TypeWriterText"

export const HomePage = () => {
  const texts = ["planning your day", "managing projects", "tracking personal goals"]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-4xl w-full rounded-lg p-8">
        <h1 className="flex text-4xl font-bold mb-6 text-center text-gray-800">
          Stay organized and productive with Taskify 
        </h1>
        <p className="text-xl text-center text-gray-600 mb-8">
          The sleek and intuitive to-do app designed to help you manage your tasks effortlessly. Whether you're <TypewriterText texts={texts} />, we've got you covered.
        </p>
      </div>
    </div>
  )
}