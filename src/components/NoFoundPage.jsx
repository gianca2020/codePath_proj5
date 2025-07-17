import { Link } from "react-router-dom"

const NoFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-[#7C2600]">
        <Link to="/" className="text-blue-500 hover:underline text-lg text-center">
      <h1>404 - Not Found</h1>
        </Link>
        <p className="text-gray-500 text-lg text-center">The page you are looking for does not exist.</p>
    </div>
  )
}

export default NoFoundPage
