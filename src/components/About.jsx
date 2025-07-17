import { Link } from "react-router-dom";

const About = () => {
    return(<>
    <h1>About Pub Finder</h1>

    <p>This application helps you find the best pubs in your city.</p>

    <p>Use the search bar to enter a city name or select a city from the dropdown.</p>

    <p>You can also filter by brewery type to find specific kinds of pubs.</p>

    <div className="mt-4">
      <Link to="/" className="text-blue-500 hover:underline">
        Back to Dashboard
      </Link>
    </div>
    </>
    )
}

export default About;